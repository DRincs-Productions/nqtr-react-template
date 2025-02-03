import { navigator, RoomInterface, routine, timeTracker } from "@drincs/nqtr";
import { Assets } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
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
        selected: room.id === navigator.currentRoom?.id,
        automaticCommitment: automaticCommitment,
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

const CURRENT_POSITION_USE_QUEY_KEY = "current_position_use_quey_key";
export function useQueryCurrentPosition() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_POSITION_USE_QUEY_KEY],
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
