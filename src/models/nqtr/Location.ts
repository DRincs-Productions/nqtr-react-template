import { ActivityInterface, LocationInterface, LocationStoredClass, MapInterface, RoomInterface } from "@drincs/nqtr";
import { ReactElement } from "react";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Location extends LocationStoredClass implements LocationInterface {
    constructor(
        id: string,
        map: MapInterface,
        props: {
            activities?: ActivityInterface[];
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            icon: ImageTimeSlots | ReactElement | ((props: Location) => ReactElement);
        }
    ) {
        super(id, map, props.activities);
        this.name = props.name;
        this._defaultdisabled = props.disabled || false;
        this._defaulthidden = props.hidden || false;
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
    override get rooms(): RoomInterface[] {
        return super.rooms.filter((room) => !room.hidden);
    }
}
