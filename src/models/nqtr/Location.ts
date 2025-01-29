import { ActivityInterface, LocationInterface, LocationStoredClass, MapInterface, RoomInterface } from "@drincs/nqtr";
import { storage } from "@drincs/pixi-vn";
import { ReactElement } from "react";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Location extends LocationStoredClass implements LocationInterface {
    constructor(
        id: string,
        map: MapInterface,
        props: {
            activities?: ActivityInterface[];
            name: string;
            disabled?: boolean;
            hidden?: boolean;
            icon: ImageTimeSlots | ReactElement | ((props: Location) => ReactElement);
        }
    ) {
        super(id, map, props.activities);
        this.name = props.name;
        this.disabled = props.disabled || false;
        this.hidden = props.hidden || false;
        this._icon = props.icon;
    }
    readonly name: string;
    private readonly _icon: ImageTimeSlots | ReactElement | ((props: Location) => ReactElement);
    get icon(): ImageTimeSlots | ReactElement {
        if (typeof this._icon === "function") {
            return this._icon(this);
        }
        return this._icon;
    }
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean | string>("disabled") || false;
        if (typeof value === "string") {
            return storage.getFlag(value);
        }
        return value;
    }
    set disabled(value: boolean | string) {
        this.setStorageProperty("disabled", value);
    }
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean | string>("hidden") || false;
        if (typeof value === "string") {
            return storage.getFlag(value);
        }
        return value;
    }
    set hidden(value: boolean | string) {
        this.setStorageProperty("hidden", value);
    }
    override get rooms(): RoomInterface[] {
        return super.rooms.filter((room) => !room.hidden);
    }
}
