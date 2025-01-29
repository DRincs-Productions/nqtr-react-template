import { LocationInterface, RoomStoredClass } from "@drincs/nqtr";
import { storage } from "@drincs/pixi-vn";
import { MyRoomInterface } from "../../nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Room extends RoomStoredClass implements MyRoomInterface {
    constructor(
        id: string,
        location: LocationInterface,
        props: {
            name: string;
            disabled?: boolean | string;
            hidden?: boolean | string;
            image: ImageTimeSlots;
            icon?: ImageTimeSlots;
            defaultActivities?: any[];
        }
    ) {
        super(id, location, props.defaultActivities);
        this.name = props.name;
        this.icon = props.icon;
        this.disabled = props.disabled;
        this.hidden = props.hidden;
        this.image = props.image;
    }
    readonly name: string;
    readonly image: ImageTimeSlots;
    readonly icon?: ImageTimeSlots;
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean | string>("disabled") || false;
        if (typeof value === "string") {
            return storage.getFlag(value);
        }
        return value;
    }
    set disabled(value: boolean | string | undefined) {
        this.setStorageProperty("disabled", value);
    }
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean | string>("hidden") || false;
        if (typeof value === "string") {
            return storage.getFlag(value);
        }
        return value;
    }
    set hidden(value: boolean | string | undefined) {
        this.setStorageProperty("hidden", value);
    }
}
