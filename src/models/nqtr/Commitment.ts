import { CommitmentInterface, ExecutionType, RoomInterface } from "@drincs/nqtr";
import CommitmentStoredClass from "@drincs/nqtr/dist/classes/CommitmentStoredClass";
import { CharacterInterface } from "@drincs/pixi-vn";
import { MyCommitmentInterface } from "../../nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Commitment extends CommitmentStoredClass implements MyCommitmentInterface {
    constructor(
        id: string,
        characters: CharacterInterface[],
        room: RoomInterface,
        onRun: OnRunEvent<CommitmentInterface> | undefined,
        props: {
            name: string;
            image: string;
            icon: ImageTimeSlots;
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
        this.icon = props.icon;
    }
    readonly name: string;
    readonly image: string;
    readonly icon: ImageTimeSlots;
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
