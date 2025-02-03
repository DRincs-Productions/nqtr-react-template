import { navigator, routine, timeTracker } from "@drincs/nqtr";
import { Assets } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

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
            return {
                currentRoom: navigator.currentRoom,
                currentLocation: navigator.currentLocation,
            };
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
            return navigator.currentLocation?.rooms.map((room) => {
                Assets.load(room.image.src);
                return {
                    icon: room.image,
                    disabled: room.disabled,
                    selected: room.id === navigator.currentRoom?.id,
                    room: room,
                };
            });
        },
    });
}
