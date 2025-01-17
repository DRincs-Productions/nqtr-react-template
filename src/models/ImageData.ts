import { timeTracker } from "@drincs/nqtr";
import { TimeSlotsEnumNumber } from "../model/TimeSlots";

export default interface ImageData {
    src: string;
}

export class ImageTimeSlots implements ImageData {
    constructor(data: {
        morning: string,
        afternoon: string,
        evening: string,
        night: string
    }) {
        this.morning = data.morning
        this.afternoon = data.afternoon
        this.evening = data.evening
        this.night = data.night
    }
    get src(): string {
        if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.MORNING) {
            return this.morning
        }
        else if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.EVENING) {
            return this.evening
        }
        else if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.NIGHT) {
            return this.night
        }
        return this.afternoon
    }
    morning: string
    afternoon: string
    evening: string
    night: string
}
