import { ActivityInterface, ActivityStoredClass, OnRunEvent } from "@drincs/nqtr";
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
            icon: ImageTimeSlots | ReactElement | ((props: Activity) => ReactElement);
        }
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this._icon = props.icon;
    }
    readonly name: string;
    private readonly _icon: ImageTimeSlots | ReactElement | ((props: Activity) => ReactElement);
    get icon(): ImageTimeSlots | ReactElement {
        if (typeof this._icon === "function") {
            return this._icon(this);
        }
        return this._icon;
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
}
