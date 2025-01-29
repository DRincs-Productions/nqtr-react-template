import { ActivityInterface, LocationStoredClass, MapInterface } from "@drincs/nqtr";
import { storage } from "@drincs/pixi-vn";
import { MyLocationInterface } from "../../nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Location extends LocationStoredClass implements MyLocationInterface {
    constructor(
        id: string,
        map: MapInterface,
        props: {
            activities?: ActivityInterface[];
            name: string;
            disabled: boolean;
            hidden: boolean;
            icon: ImageTimeSlots;
        }
    ) {
        super(id, map, props.activities);
        this.name = props.name;
        this.disabled = props.disabled;
        this.hidden = props.hidden;
        this.icon = props.icon;
    }
    readonly name: string;
    readonly icon?: ImageTimeSlots;
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
}
