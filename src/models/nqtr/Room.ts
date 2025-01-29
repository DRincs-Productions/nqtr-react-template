import { LocationInterface, RoomInterface, RoomStoredClass } from "@drincs/nqtr";
import { storage } from "@drincs/pixi-vn";
import { ReactElement } from "react";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Room extends RoomStoredClass implements RoomInterface {
    constructor(
        id: string,
        location: LocationInterface,
        props: {
            name: string;
            disabled?: boolean | string;
            hidden?: boolean | string;
            image: ImageTimeSlots;
            icon: ImageTimeSlots | ReactElement | ((props: Room) => ReactElement);
            defaultActivities?: any[];
            isEntrance?: boolean;
        }
    ) {
        super(id, location, props.defaultActivities);
        this.name = props.name;
        this.disabled = props.disabled;
        this.hidden = props.hidden;
        this.image = props.image;
        this.isEntrance = props.isEntrance || false;
    }
    readonly name: string;
    readonly image: ImageTimeSlots;
    readonly isEntrance: boolean;
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
