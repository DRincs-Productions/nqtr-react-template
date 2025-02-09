import { navigator, QuestInterface, questsNotebook, RoomInterface, routine, timeTracker } from "@drincs/nqtr";
import { Assets, storage } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { SELECTED_QUEST_STORAGE_KEY } from "../constans";
import useGameProps from "../hooks/useGameProps";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

function getRoomInfo(room: RoomInterface) {
    let image = room.image;
    let icon = room.image;
    let currentCommitments = room.routine;
    if (currentCommitments.length > 0 && currentCommitments[0].image) {
        image = currentCommitments[0].image;
    }
    Assets.load(image);

    return {
        room: room,
        image: image,
        icon: icon,
        name: room.name,
        disabled: room.disabled,
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
    const gameProps = useGameProps();
    const currentRoom = navigator.currentRoom;
    let automaticCommitment = currentRoom?.routine.find((commitment) => commitment.executionType === "automatic")?.run;
    if (automaticCommitment) {
        automaticCommitment(gameProps);
    }
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROOM_USE_QUEY_KEY],
        queryFn: () => {
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
            return navigator.currentRoom?.activities || [];
        },
    });
}

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
        queryFn: () => {
            return navigator.currentLocation?.rooms.map(getRoomInfo) || [];
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
        questImage: quest.image?.src,
        completed: quest.completed,
        isInDevelopment: quest.inDevelopment,
    };
}

const QUESTS_USE_QUEY_KEY = "quests_use_quey_key";
export function useQueryQuests() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUESTS_USE_QUEY_KEY],
        queryFn: () => {
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
        queryFn: () => {
            let selectedQuestId = storage.getVariable<string>(SELECTED_QUEST_STORAGE_KEY);
            let selectedQuest = selectedQuestId ? questsNotebook.find(selectedQuestId) : undefined;
            return selectedQuest ? getQuestInfo(selectedQuest) : null;
        },
    });
}
