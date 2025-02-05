import { ActivityInterface, ActivityStoredClass, OnRunEvent } from "@drincs/nqtr";
import { OnRunProps } from "@drincs/nqtr/dist/types/OnRunEvent";
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
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
        }
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this._icon = props.icon;
        this._defaultdisabled = props.disabled || false;
        this._defaulthidden = props.hidden || false;
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
    private _defaultdisabled: boolean | (() => boolean) = false;
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean>("disabled") || this._defaultdisabled;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set disabled(value: boolean) {
        this.setStorageProperty("disabled", value);
    }
    private _defaulthidden: boolean | (() => boolean) = false;
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean>("hidden") || this._defaulthidden;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set hidden(value: boolean) {
        this.setStorageProperty("hidden", value);
    }
    override get isActive(): boolean {
        if (this.hidden) {
            return false;
        }
        return super.isActive;
    }
}
