import { navigator } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
        queryFn: () => {
            return navigator.currentLocation?.rooms.map((room) => ({
                icon: room.image,
                disabled: room.disabled,
                selected: room.id === navigator.currentRoom?.id,
                room: room,
            }));
        },
    });
}
