import { navigator } from "@drincs/nqtr";
import { Avatar, AvatarGroup } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { NavigationRoundIconButtonConvertor } from "../../components/NavigationRoundIconButton";
import StackOverflow from "../../components/StackOverflow.tsx";
import useGameProps from "../../hooks/useGameProps.tsx";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../use_query/useQueryInterface";
import { CURRENT_ROOM_USE_QUEY_KEY, useQueryCurrentRoom, useQueryQuickRooms } from "../../use_query/useQueryNQTR.ts";

export default function QuickRooms() {
    const { data: rooms = [] } = useQueryQuickRooms();
    const { data: { room: currentRoom } = {} } = useQueryCurrentRoom();
    const queryClient = useQueryClient();
    const gameProps = useGameProps();

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
            <AnimatePresence>
                {rooms.map((props) => {
                    const { disabled, icon, name, room, characters } = props;
                    const selected = currentRoom?.id === room.id;
                    return (
                        <NavigationRoundIconButtonConvertor
                            key={"room" + room.id}
                            disabled={disabled || selected}
                            selected={selected}
                            onClick={() => {
                                if (!disabled && !selected) {
                                    navigator.currentRoom = room;
                                    queryClient.setQueryData(
                                        [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_ROOM_USE_QUEY_KEY],
                                        props
                                    );
                                    let currentRoom = navigator.currentRoom;
                                    let automaticCommitment = currentRoom?.routine.find(
                                        (commitment) => commitment.executionType === "automatic"
                                    )?.run;
                                    if (automaticCommitment) {
                                        automaticCommitment(gameProps);
                                    }
                                    if (automaticCommitment) {
                                        automaticCommitment(gameProps);
                                    }
                                }
                            }}
                            ariaLabel={name}
                            image={icon.src}
                        >
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
                                            <Avatar
                                                key={character.id}
                                                alt={character.name}
                                                src={character.icon}
                                                size='sm'
                                            />
                                        ))}
                                    </>
                                )}
                                {characters.length > 3 && (
                                    <>
                                        {characters.slice(0, 2).map((character) => (
                                            <Avatar
                                                key={character.id}
                                                alt={character.name}
                                                src={character.icon}
                                                size='sm'
                                            />
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
                        </NavigationRoundIconButtonConvertor>
                    );
                })}
            </AnimatePresence>
        </StackOverflow>
    );
}
