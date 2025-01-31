import { navigator } from "@drincs/nqtr";
import { Assets } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
        queryFn: () => {
            return navigator.currentLocation?.rooms.map((room) => {
                let icon = room.image.src;
                try {
                    icon = Assets.resolver.resolve(icon).src || icon;
                } catch {}
                return {
                    icon: icon,
                    disabled: room.disabled,
                    selected: room.id === navigator.currentRoom?.id,
                    room: room,
                };
            });
        },
    });
}
