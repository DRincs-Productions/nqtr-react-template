import { navigator } from "@drincs/nqtr";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
    CURRENT_ROOM_USE_QUEY_KEY,
    useQueryCurrentRoomId,
    useQueryQuickRooms,
    useQueryRoom,
} from "../../../hooks/useQueryNQTR.ts";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import NavigationButton from "./buttons.tsx";
import StackOverflow from "../../StackOverflow.tsx.tsx";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../hooks/useQueryInterface";

export default function QuickRooms() {
    const { data: rooms = [] } = useQueryQuickRooms();

    return (
        <StackOverflow
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            spacing={0.5}
            maxLeght={"80%"}
            sx={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                left: 0,
                pointerEvents: "auto",
            }}
        >
            {rooms.map((room) => (
                <QuickRoom key={`room-${room.id}`} roomId={room.id} {...room} />
            ))}
        </StackOverflow>
    );
}

function QuickRoom({ roomId }: { roomId: string }) {
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
                        [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROOM_USE_QUEY_KEY],
                        roomId,
                    );
                }
            }}
            ariaLabel={name || ""}
            image={icon}
        >
            {characters && (
                <AvatarGroup className="absolute right-0 bottom-0">
                    {characters.length <= 3 && (
                        characters.map((character) => (
                            <Avatar key={character.id} size="sm">
                                <AvatarImage src={character.icon} alt={character.name} />
                                <AvatarFallback>{character.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        ))
                    )}
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
