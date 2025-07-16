import { RegisteredMaps } from "@drincs/nqtr";
import { Assets, canvas, ImageSprite } from "@drincs/pixi-vn";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IconButton } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import RoundIconButton from "../../components/RoundIconButton";
import { CANVAS_UI_LAYER_NAME, NAVIGATION_ROUTE } from "../../constans";
import useGameProps from "../../hooks/useGameProps";
import useMyNavigate from "../../hooks/useMyNavigate";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../hooks/useQueryInterface";
import { CURRENT_MAP_USE_QUEY_KEY, useQueryCurrentMap } from "../../hooks/useQueryNQTR";
import useInterfaceStore from "../../stores/useInterfaceStore";
import { convertMultiTypeImage } from "../../utils/image-utility";

export default function MapScreen() {
    const { data: map } = useQueryCurrentMap();
    const queryClient = useQueryClient();
    const navigate = useMyNavigate();
    const gameProps = useGameProps();
    const editHideInterface = useInterfaceStore((state) => state.setHidden);

    useEffect(() => {
        editHideInterface(false);
        if (map) {
            convertMultiTypeImage(map.image, gameProps).then((image) => {
                if (typeof image === "string") {
                    let sprite = new ImageSprite({}, image);
                    sprite.load();
                    image = sprite;
                }
                let layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
                if (layer) {
                    layer.addChild(image);
                    map.locations.forEach((location) => {
                        let icon = location.icon;
                        if (typeof icon === "function") {
                            icon = icon(gameProps);
                        }
                        icon && layer.addChild(icon);
                    });
                }
            });

            map.neighboringMaps.north && Assets.backgroundLoadBundle(map.neighboringMaps.north);
            map.neighboringMaps.south && Assets.backgroundLoadBundle(map.neighboringMaps.south);
            map.neighboringMaps.east && Assets.backgroundLoadBundle(map.neighboringMaps.east);
            map.neighboringMaps.west && Assets.backgroundLoadBundle(map.neighboringMaps.west);

            return () => {
                canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
            };
        }
    });

    return (
        <>
            {map?.neighboringMaps.north && (
                <RoundIconButton
                    variant='soft'
                    sx={{
                        position: "absolute",
                        top: "0.1rem",
                        left: "50%",
                    }}
                    onClick={() => {
                        const newMap = RegisteredMaps.get(map.neighboringMaps.north!);
                        newMap &&
                            queryClient.setQueryData([INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY], newMap);
                    }}
                >
                    <KeyboardDoubleArrowUpIcon />
                </RoundIconButton>
            )}
            {map?.neighboringMaps.west && (
                <RoundIconButton
                    variant='soft'
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "0.1rem",
                    }}
                    onClick={() => {
                        const newMap = RegisteredMaps.get(map.neighboringMaps.west!);
                        newMap &&
                            queryClient.setQueryData([INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY], newMap);
                    }}
                >
                    <KeyboardDoubleArrowLeftIcon />
                </RoundIconButton>
            )}
            {map?.neighboringMaps.south && (
                <RoundIconButton
                    variant='soft'
                    sx={{
                        position: "absolute",
                        bottom: "0.1rem",
                        left: "50%",
                    }}
                    onClick={() => {
                        const newMap = RegisteredMaps.get(map.neighboringMaps.south!);
                        newMap &&
                            queryClient.setQueryData([INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY], newMap);
                    }}
                >
                    <KeyboardDoubleArrowDownIcon />
                </RoundIconButton>
            )}
            {map?.neighboringMaps.east && (
                <RoundIconButton
                    variant='soft'
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "0.1rem",
                    }}
                    onClick={() => {
                        const newMap = RegisteredMaps.get(map.neighboringMaps.east!);
                        newMap &&
                            queryClient.setQueryData([INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY], newMap);
                    }}
                >
                    <KeyboardDoubleArrowRightIcon />
                </RoundIconButton>
            )}
            <IconButton
                color='danger'
                sx={{
                    position: "absolute",
                    top: "0.1rem",
                    right: "0.1rem",
                }}
                onClick={() => navigate(NAVIGATION_ROUTE)}
            >
                <CloseIcon />
            </IconButton>
        </>
    );
}
