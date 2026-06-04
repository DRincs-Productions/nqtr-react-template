import { CANVAS_UI_LAYER_NAME } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentRoom } from "@/lib/query/room-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { canvas } from "@drincs/pixi-vn";
import { useEffect } from "react";

export function useNQTRDetector() {
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
