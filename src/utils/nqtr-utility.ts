import { timeTracker } from "@drincs/nqtr";
import { timeSlots } from "../constans";

const weekDaysNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
export function initializeNQTR() {
    timeTracker.initialize({
        defaultTimeSpent: 1,
        dayStartTime: 0,
        dayEndTime: 24,
        timeSlots: [
            { name: timeSlots.morning.description, startTime: timeSlots.morning.value },
            { name: timeSlots.afternoon.description, startTime: timeSlots.afternoon.value },
            { name: timeSlots.evening.description, startTime: timeSlots.evening.value },
            { name: timeSlots.night.description, startTime: timeSlots.night.value },
        ],
        getDayName: (weekDayNumber: number) => {
            return weekDaysNames[weekDayNumber];
        },
        weekendStartDay: 6,
        weekLength: 7,
    });
}
