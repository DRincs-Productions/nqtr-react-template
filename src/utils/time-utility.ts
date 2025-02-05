import { navigator, OnRunProps, questsNotebook, routine, timeTracker } from "@drincs/nqtr";
import { getFlag, storage } from "@drincs/pixi-vn";
import { VariantType } from "notistack";
import { NOT_WEEKEND_FLAG, WEEKEND_FLAG } from "../constans";

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";

export function sleep(newDayHour: number, props: OnRunProps): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        props.notify("You can't sleep now", "info");
        return false;
    }
    timeTracker.increaseDay(newDayHour);
    storage.setFlag(WEEKEND_FLAG, timeTracker.isWeekend);
    storage.setFlag(NOT_WEEKEND_FLAG, !timeTracker.isWeekend);
    routine.clearExpiredRoutine();
    navigator.clearExpiredActivities();
    questsNotebook.startsStageMustBeStarted(props);
    return true;
}

export function wait(timeSpent: number, notify: (message: string, variant: VariantType) => void): boolean {
    if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        notify("You can't sleep now", "info");
        return false;
    }
    if (timeTracker.currentHour + timeSpent >= 23 || timeTracker.currentHour < 5) {
        notify("You can't wait anymore, you should sleep now", "info");
        return false;
    }
    timeTracker.increaseHour(timeSpent);
    storage.setFlag(WEEKEND_FLAG, timeTracker.isWeekend);
    storage.setFlag(NOT_WEEKEND_FLAG, !timeTracker.isWeekend);
    return true;
}
