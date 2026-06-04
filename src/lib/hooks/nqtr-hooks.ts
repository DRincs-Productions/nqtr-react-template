import { CANVAS_UI_LAYER_NAME } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentRoom } from "@/lib/query/room-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { navigator, questsNotebook, routine, timeTracker } from "@drincs/nqtr";
import { canvas, storage } from "@drincs/pixi-vn";
import { useCallback, useEffect } from "react";

export function useRoomSync() {
    const { data: { room: currentRoom, background, activities, routine } = {} } =
        useQueryCurrentRoom();
    const gameProps = useGameProps();

    useEffect(() => {
        canvas.removeAll();
        if (background) {
            const layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
            if (layer) {
                if (background) layer.addChild(background);

                activities?.forEach((icon) => {
                    layer.addChild(icon);
                });
                routine?.forEach((icon) => {
                    layer.addChild(icon);
                });
            }
        }

        const automaticFunctions = currentRoom?.automaticFunctions || [];
        if (automaticFunctions.length > 0) {
            const automaticFunction = automaticFunctions[0];
            GameStatus.setLoading(true);
            automaticFunction(gameProps).finally(() => {
                GameStatus.setLoading(false);
            });
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [currentRoom, background, activities, routine, gameProps]);

    return null;
}

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";
export default function useTimeTracker() {
    const props = useGameProps();

    const sleep = useCallback(
        (newDayHour: number) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                props.toast(props.uiTransition("cant_sleep_now"));
                return false;
            }
            timeTracker.increaseDate(1, newDayHour);
            routine.clearExpiredRoutine();
            navigator.clearExpiredActivities();
            questsNotebook.startsStageMustBeStarted(props);
            return true;
        },
        [props],
    );

    const wait = useCallback(
        (timeSpent: number) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                props.toast(props.uiTransition("cant_sleep_now"));
                return false;
            }
            if (timeTracker.currentTime + timeSpent >= 23 || timeTracker.currentTime < 5) {
                props.toast(props.uiTransition("cant_wait_now"));
                return false;
            }
            timeTracker.increaseTime(timeSpent);
            return true;
        },
        [props],
    );

    return {
        sleep,
        wait,
    };
}
