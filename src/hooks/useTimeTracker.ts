import { navigator, OnRunProps, questsNotebook, routine, timeTracker } from "@drincs/nqtr";
import { storage } from "@drincs/pixi-vn";
import { useSnackbar } from "notistack";

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";

export function sleep(newDayHour: number, props: OnRunProps): boolean {
    if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        props.notify("You can't sleep now");
        return false;
    }
    timeTracker.increaseDate(newDayHour);
    routine.clearExpiredRoutine();
    navigator.clearExpiredActivities();
    questsNotebook.startsStageMustBeStarted(props);
    return true;
}

export function wait(timeSpent: number, notify: (message: string) => void): boolean {
    if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        notify("You can't sleep now");
        return false;
    }
    if (timeTracker.currentTime + timeSpent >= 23 || timeTracker.currentTime < 5) {
        notify("You can't wait anymore, you should sleep now");
        return false;
    }
    timeTracker.increaseTime(timeSpent);
    return true;
}

export default function useTimeTracker() {
    const { enqueueSnackbar } = useSnackbar();

    return {
        sleep,
        wait: (timeSpent: number) => wait(timeSpent, enqueueSnackbar),
    };
}
