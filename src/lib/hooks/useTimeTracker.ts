import { navigator, OnRunProps, questsNotebook, routine, timeTracker } from "@drincs/nqtr";
import { storage } from "@drincs/pixi-vn";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";

export default function useTimeTracker() {
    const { enqueueSnackbar } = useSnackbar();
    const { t: uiTransition } = useTranslation(["ui"]);

    const sleep = useCallback(
        (newDayHour: number, props: OnRunProps) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                props.notify(uiTransition("cant_sleep_now"));
                return false;
            }
            timeTracker.increaseDate(1, newDayHour);
            routine.clearExpiredRoutine();
            navigator.clearExpiredActivities();
            questsNotebook.startsStageMustBeStarted(props);
            return true;
        },
        [enqueueSnackbar]
    );

    const wait = useCallback(
        (timeSpent: number) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                enqueueSnackbar(uiTransition("cant_sleep_now"));
                return false;
            }
            if (timeTracker.currentTime + timeSpent >= 23 || timeTracker.currentTime < 5) {
                enqueueSnackbar(uiTransition("cant_wait_now"));
                return false;
            }
            timeTracker.increaseTime(timeSpent);
            return true;
        },
        [enqueueSnackbar]
    );

    return {
        sleep,
        wait,
    };
}
