import { currentActivities, getCurrentRoomRoutine, LocationBaseModel, MapBaseModel, RoomBaseModel, timeTracker } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";

export const NQTR_DATA_USE_QUEY_KEY = "nqtr_data_use_quey_key";

const CURRENT_HOUR_USE_QUEY_KEY = "current_hour_use_quey_key";
export function useQueryTime() {
	return useQuery({
		queryKey: [NQTR_DATA_USE_QUEY_KEY, CURRENT_HOUR_USE_QUEY_KEY],
		queryFn: () => {
			return timeTracker.currentHour
		},
	});
}

const CURRENT_POSITION_USE_QUEY_KEY = "current_position_use_quey_key";
export function useQueryCurrentPosition() {
	return useQuery({
		queryKey: [NQTR_DATA_USE_QUEY_KEY, CURRENT_POSITION_USE_QUEY_KEY],
		queryFn: () => {
			return {
				currentRoom: new RoomBaseModel("", new LocationBaseModel("", new MapBaseModel(""))),
				currentLocation: new LocationBaseModel("", new MapBaseModel(""))
			}
		},
	});
}

const CURRENT_ROUTINE_USE_QUEY_KEY = "current_routine_use_quey_key";
export function useQueryCurrentRoutine() {
	return useQuery({
		queryKey: [NQTR_DATA_USE_QUEY_KEY, CURRENT_ROUTINE_USE_QUEY_KEY],
		queryFn: () => {
			return getCurrentRoomRoutine()
		},
	});
}

const CURRENT_ACTIVITIES_USE_QUEY_KEY = "current_activities_use_quey_key";
export function useQueryCurrentActivities() {
	return useQuery({
		queryKey: [NQTR_DATA_USE_QUEY_KEY, CURRENT_ACTIVITIES_USE_QUEY_KEY],
		queryFn: () => {
			return currentActivities()
		},
	});
}
