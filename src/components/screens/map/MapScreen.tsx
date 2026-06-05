import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useCanvasLayerSync } from "@/lib/hooks/nqtr-hooks";
import { CURRENT_MAP_USE_QUERY_KEY, useQueryCurrentMap } from "@/lib/query/map-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export default function MapScreen() {
    const { data: { map } = {} } = useQueryCurrentMap();
    useCanvasLayerSync();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return (
        <>
            {map?.neighboringMaps.north && (
                <RoundIconButton
                    variant="soft"
                    sx={{
                        position: "absolute",
                        top: "0.1rem",
                        left: "50%",
                    }}
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.north!,
                        )
                    }
                >
                    <KeyboardDoubleArrowUpIcon />
                </RoundIconButton>
            )}
            {map?.neighboringMaps.west && (
                <RoundIconButton
                    variant="soft"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "0.1rem",
                    }}
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.west!,
                        )
                    }
                >
                    <KeyboardDoubleArrowLeftIcon />
                </RoundIconButton>
            )}
            {map?.neighboringMaps.south && (
                <RoundIconButton
                    variant="soft"
                    sx={{
                        position: "absolute",
                        bottom: "0.1rem",
                        left: "50%",
                    }}
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.south!,
                        )
                    }
                >
                    <KeyboardDoubleArrowDownIcon />
                </RoundIconButton>
            )}
            {map?.neighboringMaps.east && (
                <RoundIconButton
                    variant="soft"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "0.1rem",
                    }}
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.east!,
                        )
                    }
                >
                    <KeyboardDoubleArrowRightIcon />
                </RoundIconButton>
            )}
            <IconButton
                color="danger"
                sx={{
                    position: "absolute",
                    top: "0.1rem",
                    right: "0.1rem",
                }}
                onClick={() => navigate({ to: "/game/navigation" })}
            >
                <CloseIcon />
            </IconButton>
        </>
    );
}
