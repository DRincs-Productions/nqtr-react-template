import { setCurrentRoom, timeTracker } from "@drincs/nqtr";
import { newLabel, setFlag } from "@drincs/pixi-vn";
import { aliceQuest } from "../quests/aliceQuest";
import { timeSlots } from "../values/constants";
import { mcRoom } from "../values/rooms";

export const startLabel = newLabel("start",
    [
        (props) => {
            timeTracker.settings = {
                defaultTimeSpent: 1,
                maxDayHours: 24,
                minDayHours: 0,
                timeSlots: [
                    { name: timeSlots.morning.description, startHour: timeSlots.morning.value },
                    { name: timeSlots.afternoon.description, startHour: timeSlots.afternoon.value },
                    { name: timeSlots.evening.description, startHour: timeSlots.evening.value },
                    { name: timeSlots.night.description, startHour: timeSlots.night.value },
                ],
                weekDaysNames: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                weekendStartDay: 6,
                weekLength: 7,
            }
            setCurrentRoom(mcRoom)
            setFlag("weekend", timeTracker.isWeekend)
            setFlag("not_weekend", !timeTracker.isWeekend)
            aliceQuest.start(props)
        },
        ({ navigate }) => {
            navigate('/navigation')
        },
    ]
)
