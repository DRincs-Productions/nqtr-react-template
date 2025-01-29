import { CommitmentInterface, ExecutionType, OnRunEvent, RoomInterface } from "@drincs/nqtr";
import { CharacterInterface } from "@drincs/pixi-vn";
import { ReactElement } from "react";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Commitment extends CommitmentStoredClass implements CommitmentInterface {
    constructor(
        id: string,
        characters: CharacterInterface[],
        room: RoomInterface,
        onRun: OnRunEvent<CommitmentInterface> | undefined,
        props: {
            name: string;
            image: ImageTimeSlots;
            icon: ImageTimeSlots | ReactElement | ((props: Commitment) => ReactElement);
            executionType: ExecutionType;
            priority: number;
            fromHour?: number;
            toHour?: number;
            fromDay?: number;
            toDay?: number;
        }
    ) {
        super(id, characters, room, onRun, props.executionType, props.priority, props);
        this.name = props.name;
        this.image = props.image;
        this._icon = props.icon;
    }
    readonly name: string;
    readonly image: ImageTimeSlots;
    private readonly _icon: ImageTimeSlots | ReactElement | ((props: Commitment) => ReactElement);
    get icon(): ImageTimeSlots | ReactElement {
        if (typeof this._icon === "function") {
            return this._icon(this);
        }
        return this._icon;
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
}
