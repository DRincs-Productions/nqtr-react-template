import { clearExpiredActivities, clearExpiredRoutine, startMustStartStageQuests, timeTracker } from "@drincs/nqtr";
import { OnStartEndStageQuest } from "@drincs/nqtr/dist/override";
import { getFlag, setFlag } from "@drincs/pixi-vn";
import { VariantType } from "notistack";

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";

export function sleep(newDayHour: number, props: OnStartEndStageQuest): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        props.notify("You can't sleep now", "info")
        return false;
    }
    timeTracker.increaseDay(newDayHour)
    setFlag("weekend", timeTracker.isWeekend)
    setFlag("not_weekend", !timeTracker.isWeekend)
    clearExpiredRoutine()
    clearExpiredActivities()
    startMustStartStageQuests(props)
    return true
}

export function wait(timeSpent: number, notify: (message: string, variant: VariantType) => void): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        notify("You can't sleep now", "info")
        return false;
    }
    if (timeTracker.currentHour + timeSpent >= 23 || timeTracker.currentHour < 5) {
        notify("You can't wait anymore, you should sleep now", "info")
        return false;
    }
    timeTracker.increaseHour(timeSpent)
    setFlag("weekend", timeTracker.isWeekend)
    setFlag("not_weekend", !timeTracker.isWeekend)
    return true
}
