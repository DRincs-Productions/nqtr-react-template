import { canvas } from "@drincs/pixi-vn";
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
import useMyNavigate from "../../hooks/useMyNavigate";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../hooks/useQueryInterface";
import { CURRENT_MAP_USE_QUEY_KEY, useQueryCurrentMapId, useQueryMap } from "../../hooks/useQueryNQTR";
import useInterfaceStore from "../../stores/useInterfaceStore";

export default function MapScreen() {
    const { data: currentMapId } = useQueryCurrentMapId();
    const { data } = useQueryMap(currentMapId);
    const { background, map, locations } = data || {};
    const queryClient = useQueryClient();
    const navigate = useMyNavigate();
    const editHideInterface = useInterfaceStore((state) => state.setHidden);

    useEffect(() => {
        editHideInterface(false);
        let layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
        if (layer) {
            if (background) layer.addChild(background);

            locations?.forEach((location) => layer.addChild(location.icon));
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
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
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY],
                            map.neighboringMaps.north!,
                        )
                    }
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
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY],
                            map.neighboringMaps.west!,
                        )
                    }
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
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY],
                            map.neighboringMaps.south!,
                        )
                    }
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
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY],
                            map.neighboringMaps.east!,
                        )
                    }
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
