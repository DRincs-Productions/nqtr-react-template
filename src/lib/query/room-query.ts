import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { normalizePixiElement } from "@/lib/utils/image-utility";
import type { PixiUIProp } from "@/models/nqtr/ui-elements";
import { navigator, RegisteredRooms } from "@drincs/nqtr";
import { Assets, ImageSprite } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const ROOM_USE_QUERY_KEY = "room_use_query_key";
export function useQueryRoom(id?: string) {
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
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, ROOM_USE_QUERY_KEY, id],
        queryFn: async () => {
            if (!id) return undefined;
            const room = RegisteredRooms.get(id);
            if (!room) return undefined;

            const routine = room.routine;
            const routineBackground = room.routine.find((c) => c.background)?.background;

            let background = await normalizePixiElement(
                routineBackground || room.background,
                gameProps,
            );
            if (typeof background === "string") {
                const sprite = new ImageSprite({}, background);
                await sprite.load();
                background = sprite;
            }

            const icon = await normalizePixiElement(room.background, gameProps);

            const activitiesIcons = await loadIcons(room.activities);
            const routineIcons = await loadIcons(routine);

            return {
                room,
                background,
                icon: typeof icon === "string" ? icon : undefined,
                activities: activitiesIcons,
                routine: routineIcons,
            };
        },
    });
}

export const CURRENT_ROOM_ID_USE_QUERY_KEY = "current_room_id_use_query_key";
export function useQueryCurrentRoomId() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_ROOM_ID_USE_QUERY_KEY],
        queryFn: async () => navigator.currentRoomId,
    });
}

export function useQueryCurrentRoom() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    return useQueryRoom(currentRoomId);
}

const QUICK_ROOMS_USE_QUERY_KEY = "quick_rooms_use_query_key";
export function useQueryQuickRooms() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, QUICK_ROOMS_USE_QUERY_KEY],
        queryFn: async () => {
            const rooms = navigator.currentLocation?.rooms || [];
            const loadRoomsImage = async () => {
                rooms?.forEach((room) => {
                    Assets.backgroundLoadBundle(room.id);
                    Assets.backgroundLoadBundle(room.activitiesIds);
                    Assets.backgroundLoadBundle(room.routine.map((commitment) => commitment.id));
                });
            };
            loadRoomsImage();
            return rooms;
        },
    });
}
