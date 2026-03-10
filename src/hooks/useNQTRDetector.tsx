import { navigator } from "@drincs/nqtr";
import { canvas } from "@drincs/pixi-vn";
import { useEffect } from "react";
import { CANVAS_UI_LAYER_NAME } from "../constans";
import { useQueryCurrentRoomId, useQueryRoom, useQueryTime } from "../hooks/useQueryNQTR";
import useNqtrScreenStore from "../stores/useNqtrScreenStore";
import useGameProps from "./useGameProps";

export default function useNQTRDetector() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { room: currentRoom, background, activities, routine } = data || {};
    const { data: hour } = useQueryTime();
    const gameProps = useGameProps();
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
                setDisable(false);
            });
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [currentRoom, hour]);

    return null;
}
