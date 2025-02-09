import { navigator } from "@drincs/nqtr";
import { canvas, CanvasImage } from "@drincs/pixi-vn";
import { useEffect } from "react";
import { CANVAS_UI_LAYER_NAME } from "../constans";
import { useQueryCurrentRoom, useQueryTime } from "../use_query/useQueryNQTR";
import useGameProps from "./useGameProps";

export default function useNQTRDetector() {
    const { data: currentRoom } = useQueryCurrentRoom();
    const { data: hour } = useQueryTime();
    const gameProps = useGameProps();

    useEffect(() => {
        const { image } = currentRoom || {};
        if (image) {
            canvas.clear();
            let component = new CanvasImage({}, image.src);
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
            automaticFunction(gameProps);
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [currentRoom, hour]);

    return null;
}
