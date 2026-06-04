import { timeTracker } from "@drincs/nqtr";

export const timeSlots = {
    morning: { description: "morning", value: 5 },
    afternoon: { description: "afternoon", value: 12 },
    evening: { description: "evening", value: 18 },
    night: { description: "night", value: 22 },
};

const weekDaysNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

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
