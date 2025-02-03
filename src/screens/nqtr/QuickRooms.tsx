import { navigator } from "@drincs/nqtr";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { NavigationRoundIconButtonConvertor } from "../../components/NavigationRoundIconButton";
import StackOverflow from "../../components/StackOverflow.tsx";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../use_query/useQueryInterface";
import { useQueryQuickRooms } from "../../use_query/useQueryNQTR.ts";

export default function QuickRooms() {
    const { data: rooms = [] } = useQueryQuickRooms();
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
                {rooms.map(({ disabled, icon, id, selected, name }) => (
                    <NavigationRoundIconButtonConvertor
                        key={"room" + id}
                        disabled={disabled || selected}
                        selected={selected}
                        onClick={() => {
                            if (!disabled && !selected) {
                                navigator.currentRoom = id;
                                queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] });
                            }
                        }}
                        ariaLabel={name}
                        image={icon}
                    />
                ))}
            </AnimatePresence>
        </StackOverflow>
    );
}
