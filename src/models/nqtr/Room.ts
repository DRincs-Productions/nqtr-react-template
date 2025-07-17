import { ActivityInterface, LocationInterface, OnRunProps, RoomInterface, RoomStoredClass } from "@drincs/nqtr";
import MultiTypeSprite, { MultiTypeSpriteProp } from "../MultiTypeSprite";

export default class Room extends RoomStoredClass implements RoomInterface {
    constructor(
        id: string,
        location: LocationInterface,
        props: {
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            background: MultiTypeSpriteProp<Room>;
            activities?: ActivityInterface[];
            isEntrance?: boolean;
        }
    ) {
        super(id, location, props.activities);
        this.name = props.name;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
        this._background = props.background;
        this.isEntrance = props.isEntrance || false;
    }
    readonly name: string;
    private readonly _background: MultiTypeSpriteProp<Room>;
    get background(): MultiTypeSprite {
        const background = this._background;
        if (typeof background === "function") {
            return (runProps: OnRunProps) => background(this, runProps);
        }
        return background;
    }
    readonly isEntrance: boolean;
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
}
