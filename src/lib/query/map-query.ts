import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { normalizePixiElement } from "@/lib/utils/image-utility";
import type { PixiUIProp } from "@/models/nqtr/ui-elements";
import { navigator, RegisteredMaps } from "@drincs/nqtr";
import { Assets, ImageSprite } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const MAP_USE_QUERY_KEY = "map_use_query_key";
export function useQueryMap(id?: string) {
    const gameProps = useGameProps();

    const loadIcons = useCallback(
        async (items: Array<{ sprite?: PixiUIProp }>) => {
            const promises = items.map(async ({ sprite }) => {
                if (!sprite) return undefined;
                const icon = await normalizePixiElement(sprite, gameProps);
                if (typeof icon === "string") {
                    const s = new ImageSprite({}, icon);
                    await s.load();
                    return s;
                }
                return icon;
            });
            const results = await Promise.all(promises);
            return results.filter((i) => i !== undefined);
        },
        [gameProps],
    );

    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, MAP_USE_QUERY_KEY, id],
        queryFn: async () => {
            if (!id) return undefined;
            const map = RegisteredMaps.get(id);
            if (!map) return undefined;

            let background = await normalizePixiElement(map.background, gameProps);
            if (typeof background === "string") {
                const sprite = new ImageSprite({}, background);
                await sprite.load();
                background = sprite;
            }

            const locations = await loadIcons(map.locations);

            map.neighboringMaps.north && Assets.backgroundLoadBundle(map.neighboringMaps.north);
            map.neighboringMaps.south && Assets.backgroundLoadBundle(map.neighboringMaps.south);
            map.neighboringMaps.east && Assets.backgroundLoadBundle(map.neighboringMaps.east);
            map.neighboringMaps.west && Assets.backgroundLoadBundle(map.neighboringMaps.west);

            return {
                map: map,
                background: background,
                locations,
            };
        },
    });
}

export const CURRENT_MAP_USE_QUERY_KEY = "current_map_use_query_key";
export function useQueryCurrentMapId() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
        queryFn: async () => navigator.currentMap?.id,
    });
}
