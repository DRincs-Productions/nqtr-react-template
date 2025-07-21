import { ActivityInterface, ActivityStoredClass, ActivityStoredClassProps, OnRunEvent, OnRunProps } from "@drincs/nqtr";
import { ReactElement } from "react";
import MultiTypeSprite, { MultiTypeSpriteProp } from "../MultiTypeSprite";

export default class Activity extends ActivityStoredClass implements ActivityInterface {
    constructor(
        id: string,
        onRun: OnRunEvent<ActivityInterface>,
        props: {
            name?: string;
            sprite?: MultiTypeSpriteProp<Activity>;
            icon?: ReactElement | ((props: Activity, runProps: OnRunProps) => ReactElement);
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
        } & ActivityStoredClassProps
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this._sprite = props.sprite;
        this._icon = props.icon;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
    }
    readonly name: string;
    private readonly _sprite?: MultiTypeSpriteProp<Activity>;
    get sprite(): MultiTypeSprite | undefined {
        const sprite = this._sprite;
        if (typeof sprite === "function") {
            return (runProps: OnRunProps) => sprite(this, runProps);
        }
        return sprite;
    }
    private readonly _icon?: ReactElement | ((props: Activity, runProps: OnRunProps) => ReactElement);
    get icon(): ReactElement | ((props: OnRunProps) => ReactElement) | undefined {
        const icon = this._icon;
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
