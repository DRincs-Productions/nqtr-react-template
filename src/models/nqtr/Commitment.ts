import {
    CommitmentInterface,
    CommitmentStoredClass,
    ExecutionType,
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
            executionType?: ExecutionType;
            priority?: number;
            fromHour?: number;
            toHour?: number;
            fromDay?: number;
            toDay?: number;
            hidden?: boolean | string;
            disabled?: boolean | string;
        }
    ) {
        characters = Array.isArray(characters) ? characters : [characters];
        super(id, characters, room, props.onRun, props);
        this.name = props.name || "";
        this.image = props.image;
        this._icon = props.icon;
        this.hidden = props.hidden || false;
        this.disabled = props.disabled || false;
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
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean | string>("disabled") || false;
        if (typeof value === "string") {
            return false;
        }
        return value;
    }
    set disabled(value: boolean | string) {
        this.setStorageProperty("disabled", value);
    }
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean | string>("hidden") || false;
        if (typeof value === "string") {
            return false;
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
