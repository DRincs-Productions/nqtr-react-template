import { canvas, ImageSprite } from "@drincs/pixi-vn";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Stack } from "@mui/joy";
import { motion } from "motion/react";
import { useEffect } from "react";
import RoundIconButton from "../../components/RoundIconButton";
import { CANVAS_UI_LAYER_NAME } from "../../constans";
import { useQueryCurrentMap } from "../../hooks/useQueryNQTR";
import useInterfaceStore from "../../stores/useInterfaceStore";

export default function MapScreen() {
    const { data: map } = useQueryCurrentMap();
    const editHideInterface = useInterfaceStore((state) => state.setHidden);

    useEffect(() => {
        editHideInterface(false);
        if (map) {
            let bg = new ImageSprite({}, map.image.src);
            bg.load();
            let layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
            if (layer) {
                layer.addChild(bg);
            }

            return () => {
                canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
            };
        }
    });

    return (
        <>
            <RoundIconButton
                sx={{
                    position: "absolute",
                    top: "0.1rem",
                    left: "50%",
                }}
            >
                <KeyboardDoubleArrowUpIcon />
            </RoundIconButton>
            <RoundIconButton
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "0.1rem",
                }}
            >
                <KeyboardDoubleArrowLeftIcon />
            </RoundIconButton>
            <RoundIconButton
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: "0.1rem",
                }}
            >
                <KeyboardDoubleArrowDownIcon />
            </RoundIconButton>
            <RoundIconButton
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: "0.1rem",
                }}
            >
                <KeyboardDoubleArrowRightIcon />
            </RoundIconButton>
            <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing={0}
                sx={{
                    marginTop: "0.5rem",
                    opacity: 0.5,
                    ":hover": {
                        opacity: 1,
                    },
                }}
                component={motion.div}
                variants={{
                    open: {
                        opacity: 1,
                        y: 0,
                        pointerEvents: "auto",
                    },
                    closed: {
                        opacity: 0,
                        y: -100,
                        pointerEvents: "none",
                    },
                }}
                initial={"closed"}
                animate={"open"}
                exit={"closed"}
                transition={{ type: "tween" }}
            ></Stack>
        </>
    );
}
