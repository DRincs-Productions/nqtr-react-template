import { ActivityInterface, ActivityStoredClass, OnRunEvent } from "@drincs/nqtr";
import { storage } from "@drincs/pixi-vn";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Activity extends ActivityStoredClass implements ActivityInterface {
    constructor(
        id: string,
        onRun: OnRunEvent<ActivityInterface>,
        props: {
            fromHour?: number;
            toHour?: number;
            fromDay?: number;
            toDay?: number;
            name?: string;
            icon: ImageTimeSlots;
        }
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this.icon = props.icon;
    }
    readonly name: string;
    readonly icon: ImageTimeSlots;
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
