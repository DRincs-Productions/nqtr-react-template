import { navigator } from "@drincs/nqtr";
import { canvas } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CANVAS_UI_LAYER_NAME } from "../constans";
import { useQueryCurrentRoomId, useQueryRoom, useQueryTime } from "../hooks/useQueryNQTR";
import useNqtrScreenStore from "../stores/useNqtrScreenStore";
import useGameProps from "./useGameProps";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

export default function useNQTRDetector() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { room: currentRoom, background, activities, routine } = data || {};
    const { data: hour } = useQueryTime();
    const gameProps = useGameProps();
    const queryClient = useQueryClient();
    const setDisable = useNqtrScreenStore((state) => state.setDisabled);

    useEffect(() => {
        canvas.removeAll();
        if (background) {
            let layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
            if (layer) {
                if (background) layer.addChild(background);

                activities?.forEach((icon) => layer.addChild(icon));
                routine?.forEach((icon) => layer.addChild(icon));
            }
        }

        let automaticFunctions = navigator.currentRoom?.automaticFunctions || [];
        if (automaticFunctions.length > 0) {
            let automaticFunction = automaticFunctions[0];
            setDisable(true);
            automaticFunction(gameProps).finally(() => {
                queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] });
                setDisable(false);
            });
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [currentRoom, hour]);

    return null;
}
