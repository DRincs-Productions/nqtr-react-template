import { ActivityInterface, ActivityStoredClass, ActivityStoredClassProps, OnRunEvent, OnRunProps } from "@drincs/nqtr";
import { ReactElement } from "react";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Activity extends ActivityStoredClass implements ActivityInterface {
    constructor(
        id: string,
        onRun: OnRunEvent<ActivityInterface>,
        props: {
            name?: string;
            icon: ImageTimeSlots | ReactElement | ((props: Activity, runProps: OnRunProps) => ReactElement);
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
        } & ActivityStoredClassProps
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this._icon = props.icon;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
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
    private _defaultDisabled: boolean | (() => boolean) = false;
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean>("disabled") || this._defaultDisabled;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set disabled(value: boolean) {
        this.setStorageProperty("disabled", value);
    }
    private _defaultHidden: boolean | (() => boolean) = false;
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean>("hidden") || this._defaultHidden;
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
