import { canvas, CanvasImage } from "@drincs/pixi-vn";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CANVAS_UI_LAYER_NAME } from "../constans";
import { useQueryCurrentPosition, useQueryTime } from "../use_query/useQueryNQTR";
import { useMyNavigate } from "../utils/navigate-utility";

export default function useNQTRDetector() {
    const navigate = useMyNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation(["ui"]);
    const { t: tNarration } = useTranslation(["narration"]);
    const { data: { currentRoom } = {} } = useQueryCurrentPosition();
    const { data: hour } = useQueryTime();

    useEffect(() => {
        if (!currentRoom) {
            return;
        }
        let currentCommitments = currentRoom.routine;
        let backgroundImage = currentRoom.image.src;
        let image = new CanvasImage({}, backgroundImage);
        image.load();
        canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        canvas.getLayer(CANVAS_UI_LAYER_NAME)?.addChild(image);

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

        let automaticCommitment = currentCommitments.find((commitment) => commitment.executionType === "automatic");
        if (automaticCommitment && automaticCommitment.run) {
            automaticCommitment.run({
                navigate: navigate,
                t: tNarration,
                notify: (message, variant) => enqueueSnackbar(t(message), { variant }),
            });
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [currentRoom, hour]);

    return null;
}
