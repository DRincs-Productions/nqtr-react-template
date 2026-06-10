import { CANVAS_UI_LAYER_NAME } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentMap } from "@/lib/query/map-query";
import { useQueryCurrentRoom } from "@/lib/query/room-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { navigator, questsNotebook, routine, timeTracker, type OnRunProps } from "@drincs/nqtr";
import { canvas, storage } from "@drincs/pixi-vn";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function useMapLayerSync() {
    const { data: { background, locations } = {} } = useQueryCurrentMap();

    useEffect(() => {
        const layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
        if (layer) {
            if (background) layer.addChild(background);
            locations?.forEach((location) => {
                layer.addChild(location);
            });
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [background, locations]);

    return null;
}

export function useRoomLayerSync() {
    const {
        data: { room: { automaticFunctions = [] } = {}, background, activities, routine } = {},
    } = useQueryCurrentRoom();
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
    }, [background, activities, routine, gameProps, automaticFunctions]);

    return null;
}

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";
export default function useTimeTracker() {
    const { t } = useTranslation(["ui"]);

    const sleep = useCallback(
        (newDayHour: number, props: OnRunProps) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                toast(t("cant_sleep_now"));
                return false;
            }
            timeTracker.increaseDate(1, newDayHour);
            routine.clearExpiredRoutine();
            navigator.clearExpiredActivities();
            questsNotebook.startsStageMustBeStarted(props);
            return true;
        },
        [t],
    );

    const wait = useCallback(
        (timeSpent: number) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                toast(t("cant_sleep_now"));
                return false;
            }
            if (timeTracker.currentTime + timeSpent >= 23 || timeTracker.currentTime < 5) {
                toast(t("cant_wait_now"));
                return false;
            }
            timeTracker.increaseTime(timeSpent);
            return true;
        },
        [t],
    );

    return {
        sleep,
        wait,
    };
}
