import { navigator } from "@drincs/nqtr";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { NavigationRoundIconButtonConvertor } from "../../components/NavigationRoundIconButton";
import StackOverflow from "../../components/StackOverflow.tsx";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../use_query/useQueryInterface";
import { CURRENT_ROOM_USE_QUEY_KEY, useQueryCurrentRoom, useQueryQuickRooms } from "../../use_query/useQueryNQTR.ts";

export default function QuickRooms() {
    const { data: rooms = [] } = useQueryQuickRooms();
    const { data: { room: currentRoom } = {} } = useQueryCurrentRoom();
    const queryClient = useQueryClient();

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
                    const { disabled, icon, name, room } = props;
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
                                }
                            }}
                            ariaLabel={name}
                            image={icon.src}
                        />
                    );
                })}
            </AnimatePresence>
        </StackOverflow>
    );
}
