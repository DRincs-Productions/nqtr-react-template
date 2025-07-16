import { navigator, QuestInterface, questsNotebook, RegisteredRooms, RoomInterface, timeTracker } from "@drincs/nqtr";
import { Assets, storage } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { SELECTED_QUEST_STORAGE_KEY } from "../constans";
import TimeSlotsImage from "../models/TimeSlotsImage";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

function getRoomInfo(room: RoomInterface) {
    const routine = room.routine;
    const background = routine.length > 0 ? routine[0].background : room.background;
    let icon: string | TimeSlotsImage | undefined;
    if (typeof background === "string" || background instanceof TimeSlotsImage) {
        icon = background;
    }

    return {
        id: room.id,
        background: background,
        icon: icon,
        name: room.name,
        disabled: room.disabled,
        routine: routine,
        activities: room.activities,
        characters: room.characters,
    };
}

const CURRENT_HOUR_USE_QUEY_KEY = "current_hour_use_quey_key";
export function useQueryTime() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_HOUR_USE_QUEY_KEY],
        queryFn: async () => timeTracker.currentTime,
    });
}

export const ROOM_USE_QUEY_KEY = "room_use_quey_key";
export function useQueryRoom(id?: string) {
    const room = id ? RegisteredRooms.get(id) : undefined;
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, ROOM_USE_QUEY_KEY, id],
        queryFn: async () => (room ? getRoomInfo(room) : undefined),
    });
}

export const CURRENT_ROOM_USE_QUEY_KEY = "current_room_use_quey_key";
export function useQueryCurrentRoomId() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROOM_USE_QUEY_KEY],
        queryFn: async () => navigator.currentRoomId,
    });
}

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
    const rooms = navigator.currentLocation?.rooms || [];
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
        queryFn: async () => {
            const loadRoomsImage = async () => {
                rooms?.forEach((room) => {
                    Assets.backgroundLoadBundle(room.id);
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
            let inProgressQuests = questsNotebook.inProgressQuests.map(getQuestInfo);
            let completedQuests = questsNotebook.completedQuests.map(getQuestInfo);
            let failedQuests = questsNotebook.failedQuests.map(getQuestInfo);
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
            let selectedQuestId = storage.getVariable<string>(SELECTED_QUEST_STORAGE_KEY);
            let selectedQuest = selectedQuestId ? questsNotebook.find(selectedQuestId) : undefined;
            return selectedQuest ? getQuestInfo(selectedQuest) : null;
        },
    });
}

export const CURRENT_MAP_USE_QUEY_KEY = "current_map_use_quey_key";
export function useQueryCurrentMap() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY],
        queryFn: async () => navigator.currentMap,
    });
}
