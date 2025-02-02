import { timeTracker } from "@drincs/nqtr";

enum TimeSlotsEnumNumber {
    MORNING = 0,
    AFTERNOON = 1,
    EVENING = 2,
    NIGHT = 3,
}

export default class ImageTimeSlots {
    constructor(data: { morning: string; afternoon: string; evening: string; night: string } | string) {
        if (typeof data === "string") {
            this.morning = data;
            this.afternoon = data;
            this.evening = data;
            this.night = data;
            return;
        }
        this.morning = data.morning;
        this.afternoon = data.afternoon;
        this.evening = data.evening;
        this.night = data.night;
    }
    get src(): string {
        if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.MORNING) {
            return this.morning;
        } else if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.EVENING) {
            return this.evening;
        } else if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.NIGHT) {
            return this.night;
        }
        return this.afternoon;
    }
    morning: string;
    afternoon: string;
    evening: string;
    night: string;
}
