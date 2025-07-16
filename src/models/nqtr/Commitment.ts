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
import MultiTypeImage, { MultiTypeImageProp } from "../MultiTypeImage";

export default class Commitment extends CommitmentStoredClass implements CommitmentInterface {
    constructor(
        id: string,
        characters: CharacterInterface | CharacterInterface[],
        room: RoomInterface,
        props: {
            name?: string;
            image?: MultiTypeImageProp<Commitment>;
            icon?: ReactElement | ((props: Commitment, runProps: OnRunProps) => ReactElement);
            onRun?: OnRunEvent<CommitmentInterface>;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
        } & CommitmentStoredClassProps
    ) {
        characters = Array.isArray(characters) ? characters : [characters];
        super(id, characters, room, props.onRun, props);
        this.name = props.name || "";
        this._image = props.image;
        this._icon = props.icon;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
    }
    readonly name: string;
    private readonly _image?: MultiTypeImageProp<Commitment>;
    get image(): MultiTypeImage | undefined {
        let image = this._image;
        if (typeof image === "function") {
            return (runProps: OnRunProps) => image(this, runProps);
        }
        return image;
    }
    private readonly _icon?: ReactElement | ((props: Commitment, runProps: OnRunProps) => ReactElement);
    get icon(): ReactElement | ((props: OnRunProps) => ReactElement) | undefined {
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
