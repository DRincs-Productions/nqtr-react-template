import { setCurrentRoom } from '@drincs/nqtr';
import { ImageBackdrop, ImageSrc, StackOverflow } from '@drincs/react-components';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from "motion/react";
import NavigationRoundIconButton from '../../components/NavigationRoundIconButton';
import { INTERFACE_DATA_USE_QUEY_KEY } from '../../use_query/useQueryInterface';
import { useQueryQuickRooms } from '../../use_query/useQueryNQTRComponents';

export default function QuickRooms() {
    const { data: rooms = [] } = useQueryQuickRooms()
    const queryClient = useQueryClient()

    return (
        <StackOverflow
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            spacing={0.5}
            maxLeght={"80%"}
            sx={{
                display: 'flex',
                position: "absolute",
                bottom: 0,
                left: 0,
                pointerEvents: "auto",
            }}
        >
            <AnimatePresence>
                {rooms.map(({ disabled, icon: { src, type }, room, selected }) =>
                    <NavigationRoundIconButton
                        key={"room" + room.id}
                        disabled={disabled || selected}
                        selected={selected}
                        onClick={() => {
                            if (!disabled && !selected) {
                                setCurrentRoom(room)
                                queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                            }
                        }}
                        ariaLabel={room.name}
                    >
                        {type === "image" && <ImageSrc image={src} />}
                        {type === "image" && <ImageBackdrop />}
                        {type === "react" && src}
                    </NavigationRoundIconButton>
                )}
            </AnimatePresence>
        </StackOverflow>
    );
}
