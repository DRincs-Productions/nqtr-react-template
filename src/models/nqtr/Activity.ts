import { ActivityInterface, ActivityStoredClass, ActivityStoredClassProps, OnRunEvent, OnRunProps } from "@drincs/nqtr";
import { ReactElement } from "react";
import TimeSlotsImage from "../TimeSlotsImage";

export default class Activity extends ActivityStoredClass implements ActivityInterface {
    constructor(
        id: string,
        onRun: OnRunEvent<ActivityInterface>,
        props: {
            name?: string;
            image?: TimeSlotsImage;
            icon: ReactElement | ((props: Activity, runProps: OnRunProps) => ReactElement);
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
        } & ActivityStoredClassProps
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this.image = props.image;
        this._icon = props.icon;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
    }
    readonly name: string;
    readonly image?: TimeSlotsImage;
    private readonly _icon: ReactElement | ((props: Activity, runProps: OnRunProps) => ReactElement);
    get icon(): ReactElement | ((props: OnRunProps) => ReactElement) {
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
