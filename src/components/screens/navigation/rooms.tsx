import NavigationButton from "@/components/screens/navigation/buttons";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import {
    CURRENT_ROOM_ID_USE_QUERY_KEY,
    useQueryCurrentRoomId,
    useQueryQuickRooms,
    useQueryRoom,
} from "@/lib/query/room-query";
import { navigator } from "@drincs/nqtr";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function QuickRooms() {
    const { data: rooms = [] } = useQueryQuickRooms();

    return (
        <ScrollArea className="absolute bottom-0 left-0 max-w-[80%] pointer-events-auto">
            <div className="flex flex-row items-end justify-center gap-0.5">
                {rooms.map((room) => (
                    <RoomButton key={`room-${room.id}`} roomId={room.id} {...room} />
                ))}
            </div>
        </ScrollArea>
    );
}

function RoomButton({ roomId }: { roomId: string }) {
    const queryClient = useQueryClient();
    const { data } = useQueryRoom(roomId);
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { room, icon } = data || {};
    const { disabled, name, characters } = room || {};
    const selected = useMemo(() => currentRoomId === roomId, [currentRoomId, roomId]);

    return (
        <NavigationButton
            disabled={disabled || selected}
            selected={selected}
            onClick={() => {
                if (!disabled && !selected) {
                    navigator.currentRoom = roomId;
                    queryClient.setQueryData(
                        [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_ROOM_ID_USE_QUERY_KEY],
                        roomId,
                    );
                }
            }}
            ariaLabel={name || ""}
            image={icon}
        >
            {characters && (
                <AvatarGroup className="absolute right-0 bottom-0">
                    {characters.length <= 3 &&
                        characters.map((character) => (
                            <Avatar key={character.id} size="sm">
                                <AvatarImage src={character.icon} alt={character.name} />
                                <AvatarFallback>{character.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        ))}
                    {characters.length > 3 && (
                        <>
                            {characters.slice(0, 2).map((character) => (
                                <Avatar key={character.id} size="sm">
                                    <AvatarImage src={character.icon} alt={character.name} />
                                    <AvatarFallback>{character.name.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                            ))}
                            <AvatarGroupCount className="size-6 bg-black/50 text-white">
                                +{characters.length - 2}
                            </AvatarGroupCount>
                        </>
                    )}
                </AvatarGroup>
            )}
        </NavigationButton>
    );
}
