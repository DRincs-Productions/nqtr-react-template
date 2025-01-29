import { ActivityInterface, ActivityStoredClass } from "@drincs/nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Activity extends ActivityStoredClass implements ActivityInterface {
    readonly name: ImageTimeSlots;
    readonly icon: ImageTimeSlots;
    get disabled(): boolean {
        throw new Error("Method not implemented.");
    }
    set disabled(value: boolean) {
        throw new Error("Method not implemented.");
    }
    get hidden(): boolean {
        throw new Error("Method not implemented.");
    }
    set hidden(value: boolean) {
        throw new Error("Method not implemented.");
    }
}
