import { navigator } from "@drincs/nqtr";
import { Avatar, AvatarGroup } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { NqtrRoundIconButtonConvertor } from "../../components/NqtrRoundIconButton.tsx";
import StackOverflow from "../../components/StackOverflow.tsx";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../hooks/useQueryInterface";
import {
    CURRENT_ROOM_USE_QUEY_KEY,
    useQueryCurrentRoomId,
    useQueryQuickRooms,
    useQueryRoom,
} from "../../hooks/useQueryNQTR.ts";

export default function QuickRooms() {
    const { data: rooms = [] } = useQueryQuickRooms();

    return (
        <StackOverflow
            direction='row'
            justifyContent='center'
            alignItems='flex-end'
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
                <QuickRoom key={"room-" + room.id} roomId={room.id} {...room} />
            ))}
        </StackOverflow>
    );
}

function QuickRoom({ roomId }: { roomId: string }) {
    const queryClient = useQueryClient();
    const { data } = useQueryRoom(roomId);
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { disabled, icon, name, characters, room } = data || {};
    const selected = useMemo(() => currentRoomId === roomId, [currentRoomId, roomId]);

    return (
        <NqtrRoundIconButtonConvertor
            disabled={disabled || selected}
            selected={selected}
            onClick={() => {
                if (!disabled && !selected && room) {
                    navigator.currentRoom = room;
                    queryClient.setQueryData([INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROOM_USE_QUEY_KEY], roomId);
                }
            }}
            ariaLabel={name || ""}
            image={icon}
        >
            {characters && (
                <AvatarGroup
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        "--Avatar-size": { xs: "15px", sm: "22px", md: "28px" },
                    }}
                >
                    {characters.length <= 3 && (
                        <>
                            {characters.map((character) => (
                                <Avatar key={character.id} alt={character.name} src={character.icon} size='sm' />
                            ))}
                        </>
                    )}
                    {characters.length > 3 && (
                        <>
                            {characters.slice(0, 2).map((character) => (
                                <Avatar key={character.id} alt={character.name} src={character.icon} size='sm' />
                            ))}
                            <Avatar
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                }}
                                size='sm'
                            >
                                +{characters.length - 2}
                            </Avatar>
                        </>
                    )}
                </AvatarGroup>
            )}
        </NqtrRoundIconButtonConvertor>
    );
}
