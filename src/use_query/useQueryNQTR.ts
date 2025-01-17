import { currentActivities, getCurrenrLocation, getCurrentRoom, getCurrentRoomRoutine, timeTracker } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

const CURRENT_HOUR_USE_QUEY_KEY = "current_hour_use_quey_key";
export function useQueryTime() {
	return useQuery({
		queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_HOUR_USE_QUEY_KEY],
		queryFn: () => {
			return timeTracker.currentHour
		},
	});
}

const CURRENT_POSITION_USE_QUEY_KEY = "current_position_use_quey_key";
export function useQueryCurrentPosition() {
	return useQuery({
		queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_POSITION_USE_QUEY_KEY],
		queryFn: () => {
			return {
				currentRoom: getCurrentRoom(),
				currentLocation: getCurrenrLocation()
			}
		},
	});
}

const CURRENT_ROUTINE_USE_QUEY_KEY = "current_routine_use_quey_key";
export function useQueryCurrentRoutine() {
	return useQuery({
		queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROUTINE_USE_QUEY_KEY],
		queryFn: () => {
			return getCurrentRoomRoutine()
		},
	});
}

const CURRENT_ACTIVITIES_USE_QUEY_KEY = "current_activities_use_quey_key";
export function useQueryCurrentActivities() {
	return useQuery({
		queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ACTIVITIES_USE_QUEY_KEY],
		queryFn: () => {
			return currentActivities()
		},
	});
}
