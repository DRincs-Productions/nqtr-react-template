import {
    CommitmentInterface,
    CommitmentStoredClass,
    CommitmentStoredClassProps,
    OnRunEvent,
    OnRunProps,
    RoomInterface,
} from "@drincs/nqtr";
import { CharacterInterface } from "@drincs/pixi-vn";
import { ReactElement } from "react";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Commitment extends CommitmentStoredClass implements CommitmentInterface {
    constructor(
        id: string,
        characters: CharacterInterface | CharacterInterface[],
        room: RoomInterface,
        props: {
            name?: string;
            image?: ImageTimeSlots;
            icon?: ImageTimeSlots | ReactElement | ((props: Commitment, runProps: OnRunProps) => ReactElement);
            onRun?: OnRunEvent<CommitmentInterface>;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
        } & CommitmentStoredClassProps
    ) {
        characters = Array.isArray(characters) ? characters : [characters];
        super(id, characters, room, props.onRun, props);
        this.name = props.name || "";
        this.image = props.image;
        this._icon = props.icon;
        this._defaultdisabled = props.disabled || false;
        this._defaulthidden = props.hidden || false;
    }
    readonly name: string;
    readonly image?: ImageTimeSlots;
    private readonly _icon?:
        | ImageTimeSlots
        | ReactElement
        | ((props: Commitment, runProps: OnRunProps) => ReactElement);
    get icon(): ImageTimeSlots | ReactElement | ((props: OnRunProps) => ReactElement) | undefined {
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
