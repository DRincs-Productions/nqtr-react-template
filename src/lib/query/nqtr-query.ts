import {
    navigator,
    type QuestInterface,
    questsNotebook,
    RegisteredMaps,
    RegisteredRooms,
    timeTracker,
} from "@drincs/nqtr";
import { Assets, ImageSprite, storage } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import type { PixiUIProp } from "../../models/nqtr/ui-elements";
import { SELECTED_QUEST_STORAGE_KEY } from "../constans";
import { normalizePixiElement } from "../utils/image-utility";
import useGameProps from "./useGameProps";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

const CURRENT_HOUR_USE_QUEY_KEY = "current_hour_use_quey_key";
export function useQueryTime() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_HOUR_USE_QUEY_KEY],
        queryFn: async () => timeTracker.currentTime,
    });
}

const ROOM_USE_QUEY_KEY = "room_use_quey_key";
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
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, ROOM_USE_QUEY_KEY, id],
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

export const CURRENT_ROOM_ID_USE_QUEY_KEY = "current_room_id_use_quey_key";
export function useQueryCurrentRoomId() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROOM_ID_USE_QUEY_KEY],
        queryFn: async () => navigator.currentRoomId,
    });
}

export function useCurrentRoom() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    return useQueryRoom(currentRoomId);
}

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
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

function getQuestInfo(quest: QuestInterface) {
    let currentStageDescription = "";
    if (quest.currentStage) {
        if (quest.completed) {
            if (quest.inDevelopment) {
                currentStageDescription = "quest_is_in_development";
            } else {
                currentStageDescription = "completed";
            }
        } else if (!quest.currentStage.started && quest.currentStage.requestDescriptionToStart) {
            currentStageDescription = quest.currentStage.requestDescriptionToStart;
        } else if (quest.currentStage.description) {
            currentStageDescription = quest.currentStage.description;
        }
    }

    return {
        id: quest.id,
        name: quest.name,
        description: quest.description,
        currentStage: {
            description: currentStageDescription,
        },
        questImage: quest.image,
        completed: quest.completed,
        isInDevelopment: quest.inDevelopment,
    };
}

const QUESTS_USE_QUEY_KEY = "quests_use_quey_key";
export function useQueryQuests() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUESTS_USE_QUEY_KEY],
        queryFn: async () => {
            const inProgressQuests = questsNotebook.inProgressQuests.map(getQuestInfo);
            const completedQuests = questsNotebook.completedQuests.map(getQuestInfo);
            const failedQuests = questsNotebook.failedQuests.map(getQuestInfo);
            return {
                inProgressQuests,
                completedQuests,
                failedQuests,
            };
        },
    });
}

export const SELECTED_QUEST_USE_QUEY_KEY = "selected_quest_use_quey_key";
export function useQuerySelectedQuest() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, SELECTED_QUEST_USE_QUEY_KEY],
        queryFn: async () => {
            const selectedQuestId = storage.get<string>(SELECTED_QUEST_STORAGE_KEY);
            const selectedQuest = selectedQuestId
                ? questsNotebook.find(selectedQuestId)
                : undefined;
            return selectedQuest ? getQuestInfo(selectedQuest) : null;
        },
    });
}

const MAP_USE_QUEY_KEY = "map_use_quey_key";
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
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, MAP_USE_QUEY_KEY, id],
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

export const CURRENT_MAP_USE_QUEY_KEY = "current_map_use_quey_key";
export function useQueryCurrentMapId() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY],
        queryFn: async () => navigator.currentMap?.id,
    });
}
