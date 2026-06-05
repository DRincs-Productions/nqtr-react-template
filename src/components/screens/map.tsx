import { Button } from "@/components/ui/button";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useMapLayerSync } from "@/lib/hooks/nqtr-hooks";
import { CURRENT_MAP_USE_QUERY_KEY, useQueryCurrentMap } from "@/lib/query/map-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, X } from "lucide-react";

export default function MapScreen() {
    const { data: { map } = {} } = useQueryCurrentMap();
    useMapLayerSync();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return (
        <>
            {map?.neighboringMaps.north && (
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1 left-1/2 -translate-x-1/2"
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.north,
                        )
                    }
                >
                    <ChevronsUp />
                </Button>
            )}
            {map?.neighboringMaps.west && (
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 left-1 -translate-y-1/2"
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.west,
                        )
                    }
                >
                    <ChevronsLeft />
                </Button>
            )}
            {map?.neighboringMaps.south && (
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2"
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.south,
                        )
                    }
                >
                    <ChevronsDown />
                </Button>
            )}
            {map?.neighboringMaps.east && (
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 right-1 -translate-y-1/2"
                    onClick={() =>
                        queryClient.setQueryData(
                            [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            map.neighboringMaps.east,
                        )
                    }
                >
                    <ChevronsRight />
                </Button>
            )}
            <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1"
                onClick={() => navigate({ to: "/game/navigation" })}
            >
                <X />
            </Button>
        </>
    );
}
