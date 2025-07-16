import { navigator } from "@drincs/nqtr";
import { canvas, ImageSprite } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CANVAS_UI_LAYER_NAME } from "../constans";
import { useQueryCurrentRoomId, useQueryRoom, useQueryTime } from "../hooks/useQueryNQTR";
import useNqtrScreenStore from "../stores/useNqtrScreenStore";
import { convertMultiTypeImage } from "../utils/image-utility";
import useGameProps from "./useGameProps";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

export default function useNQTRDetector() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data: currentRoom } = useQueryRoom(currentRoomId);
    const { data: hour } = useQueryTime();
    const gameProps = useGameProps();
    const queryClient = useQueryClient();
    const setDisable = useNqtrScreenStore((state) => state.setDisabled);

    useEffect(() => {
        const { image } = currentRoom || {};
        if (image) {
            convertMultiTypeImage(image, gameProps).then((image) => {
                let layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
                if (layer) {
                    if (typeof image === "string") {
                        let sprite = new ImageSprite({}, image);
                        sprite.load();
                        image = sprite;
                    }
                    layer.addChild(image);

                    currentRoom?.activities.forEach(({ image }) => {
                        image &&
                            convertMultiTypeImage(image, gameProps).then((image) => {
                                if (typeof image === "string") {
                                    let sprite = new ImageSprite({}, image);
                                    sprite.load();
                                    image = sprite;
                                }
                                layer.addChild(image);
                            });
                    });
                    let currentCommitments = currentRoom?.routine;
                    if (currentCommitments && currentCommitments.length > 0 && currentCommitments[0].image) {
                        let image = currentCommitments[0].image;
                        convertMultiTypeImage(image, gameProps).then((image) => {
                            if (typeof image === "string") {
                                let sprite = new ImageSprite({}, image);
                                sprite.load();
                                image = sprite;
                            }
                            layer.addChild(image);
                        });
                    }
                }
            });
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
