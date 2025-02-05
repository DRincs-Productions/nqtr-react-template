import { ActivityInterface, LocationInterface, RoomInterface, RoomStoredClass } from "@drincs/nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Room extends RoomStoredClass implements RoomInterface {
    constructor(
        id: string,
        location: LocationInterface,
        props: {
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            image: ImageTimeSlots;
            activities?: ActivityInterface[];
            isEntrance?: boolean;
        }
    ) {
        super(id, location, props.activities);
        this.name = props.name;
        this._defaultdisabled = props.disabled || false;
        this._defaulthidden = props.hidden || false;
        this.image = props.image;
        this.isEntrance = props.isEntrance || false;
    }
    readonly name: string;
    readonly image: ImageTimeSlots;
    readonly isEntrance: boolean;
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
}
