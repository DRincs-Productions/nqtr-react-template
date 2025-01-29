import { ActivityInterface, ActivityStoredClass, OnRunEvent } from "@drincs/nqtr";
import { OnRunProps } from "@drincs/nqtr/dist/types/OnRunEvent";
import { storage } from "@drincs/pixi-vn";
import { ReactElement } from "react";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Activity extends ActivityStoredClass implements ActivityInterface {
    constructor(
        id: string,
        onRun: OnRunEvent<ActivityInterface>,
        props: {
            fromHour?: number;
            toHour?: number;
            fromDay?: number;
            toDay?: number;
            name?: string;
            icon: ImageTimeSlots | ReactElement | ((props: Activity, runProps: OnRunProps) => ReactElement);
        }
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this._icon = props.icon;
    }
    readonly name: string;
    private readonly _icon: ImageTimeSlots | ReactElement | ((props: Activity, runProps: OnRunProps) => ReactElement);
    get icon(): ImageTimeSlots | ReactElement | ((props: OnRunProps) => ReactElement) {
        let icon = this._icon;
        if (typeof icon === "function") {
            return (runProps: OnRunProps) => icon(this, runProps);
        }
        return icon;
    }
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean | string>("disabled") || false;
        if (typeof value === "string") {
            return storage.getFlag(value);
        }
        return value;
    }
    set disabled(value: boolean | string) {
        this.setStorageProperty("disabled", value);
    }
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean | string>("hidden") || false;
        if (typeof value === "string") {
            return storage.getFlag(value);
        }
        return value;
    }
    set hidden(value: boolean | string) {
        this.setStorageProperty("hidden", value);
    }
    override get isActive(): boolean {
        if (this.hidden) {
            return false;
        }
        return super.isActive;
    }
}
