import {
    ActivityInterface,
    CommitmentInterface,
    LocationInterface,
    OnRunProps,
    RoomInterface,
    RoomStoredClass,
} from "@drincs/nqtr";
import { PixiUIParam, PixiUIProp } from "./ui-elements";

export default class Room extends RoomStoredClass implements RoomInterface {
    constructor(
        id: string,
        location: LocationInterface,
        props: {
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            background: PixiUIParam<Room>;
            activities?: ActivityInterface[];
            routine?: CommitmentInterface[];
            isEntrance?: boolean;
        },
    ) {
        super(id, location, {
            activities: props.activities || [],
            routine: props.routine || [],
        });
        this.name = props.name;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
        this._background = props.background;
        this.isEntrance = props.isEntrance || false;
    }
    readonly name: string;
    private readonly _background: PixiUIParam<Room>;
    get background(): PixiUIProp {
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
