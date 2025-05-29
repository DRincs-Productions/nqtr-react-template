import { navigator } from "@drincs/nqtr";
import { canvas, ImageSprite } from "@drincs/pixi-vn";
import { useEffect } from "react";
import { CANVAS_UI_LAYER_NAME } from "../constans";
import useNqtrScreenStore from "../stores/useNqtrScreenStore";
import { useQueryCurrentRoomId, useQueryRoom, useQueryTime } from "../use_query/useQueryNQTR";
import useGameProps from "./useGameProps";

export default function useNQTRDetector() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data: currentRoom } = useQueryRoom(currentRoomId);
    const { data: hour } = useQueryTime();
    const gameProps = useGameProps();
    const setDisable = useNqtrScreenStore((state) => state.setDisabled);

    useEffect(() => {
        const { image } = currentRoom || {};
        if (image) {
            canvas.clear();
            let component = new ImageSprite({}, image.src);
            component.load();
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.addChild(component);
        }

        // currentRoom.activities.forEach((activity) => {
        //     if (!activity.renderIcon) {
        //         return;
        //     }
        //     let icon = activity.renderIcon({
        //         navigate: navigate,
        //         t: t,
        //         notify: (t(message), variant) => enqueueSnackbar(message, { variant }),
        //     });
        //     if (icon instanceof CanvasBase) {
        //         container.addChild(icon);
        //     }
        // });

        // currentCommitments.forEach((commitment) => {
        //     if (!commitment.renderIcon) {
        //         return;
        //     }
        //     let icon = commitment.renderIcon({
        //         navigate: navigate,
        //         t: t,
        //         notify: (t(message), variant) => enqueueSnackbar(message, { variant }),
        //     });
        //     if (icon instanceof CanvasBase) {
        //         container.addChild(icon);
        //     }
        // });

        let automaticFunction = navigator.currentRoom?.automaticFunction;
        if (automaticFunction) {
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
