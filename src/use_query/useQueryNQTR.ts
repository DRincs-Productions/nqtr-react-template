import { navigator, questsNotebook, RoomInterface, routine, timeTracker } from "@drincs/nqtr";
import { Assets, storage } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { SELECTED_QUEST_STORAGE_KEY } from "../constans";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

function getRoomInfo(room: RoomInterface) {
    let image = room.image;
    let icon = room.image;
    let currentCommitments = room.routine;
    if (currentCommitments.length > 0 && currentCommitments[0].image) {
        image = currentCommitments[0].image;
    }
    Assets.load(image);

    let automaticCommitment = currentCommitments.find((commitment) => commitment.executionType === "automatic")?.run;

    return {
        room: room,
        image: image,
        icon: icon,
        name: room.name,
        disabled: room.disabled,
        automaticCommitment: automaticCommitment,
        routine: currentCommitments,
        activities: room.activities,
        characters: room.characters,
    };
}

const CURRENT_HOUR_USE_QUEY_KEY = "current_hour_use_quey_key";
export function useQueryTime() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_HOUR_USE_QUEY_KEY],
        queryFn: () => {
            return timeTracker.currentHour;
        },
    });
}

export const CURRENT_ROOM_USE_QUEY_KEY = "current_room_use_quey_key";
export function useQueryCurrentRoom() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROOM_USE_QUEY_KEY],
        queryFn: () => {
            let currentRoom = navigator.currentRoom;
            return currentRoom ? getRoomInfo(currentRoom) : undefined;
        },
    });
}

const CURRENT_ROUTINE_USE_QUEY_KEY = "current_routine_use_quey_key";
export function useQueryCurrentRoutine() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROUTINE_USE_QUEY_KEY],
        queryFn: () => {
            return routine.currentRoomRoutine;
        },
    });
}

const CURRENT_ACTIVITIES_USE_QUEY_KEY = "current_activities_use_quey_key";
export function useQueryCurrentActivities() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ACTIVITIES_USE_QUEY_KEY],
        queryFn: () => {
            return navigator.currentRoom?.activities;
        },
    });
}

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
        queryFn: () => {
            return navigator.currentLocation?.rooms.map(getRoomInfo);
        },
    });
}

export type QuestDescription = {
    id: string;
    name: string;
    description: string;
    currentStage: {
        description: string;
    };
    questImage?: string;
    completed?: boolean;
    isInDevelopment?: boolean;
};

function getStartedQuests() {
    let quests: QuestDescription[] = questsNotebook.startedQuests.map((quest) => {
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
            questImage: quest.image?.src,
            completed: quest.completed,
            isInDevelopment: quest.inDevelopment,
        };
    });
    return quests.filter((quest) => {
        return !quest.completed;
    });
}

function getCompletedQuests() {
    let quests: QuestDescription[] = questsNotebook.startedQuests.map((quest) => {
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
            questImage: quest.image?.src,
            completed: quest.completed,
            isInDevelopment: quest.inDevelopment,
        };
    });
    return quests.filter((quest) => {
        return quest.completed;
    });
}

export const QUESTS_USE_QUEY_KEY = "quests_use_quey_key";
export function useQueryQuests() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUESTS_USE_QUEY_KEY],
        queryFn: () => {
            let startedQuests = getStartedQuests() || [];
            let completedQuests = getCompletedQuests() || [];
            let selectedQuestId = storage.getVariable(SELECTED_QUEST_STORAGE_KEY);
            let selectedQuest = startedQuests.find((quest) => quest.id === selectedQuestId);
            return {
                startedQuests,
                completedQuests,
                selectedQuest,
            };
        },
    });
}
