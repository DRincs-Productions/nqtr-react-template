import { getCurrentRoom, setCurrentRoom } from '@drincs/nqtr';
import { ImageBackdrop, ImageSrc, StackOverflow } from '@drincs/react-components';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from "motion/react";
import { useSnackbar } from 'notistack';
import { isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import NavigationRoundIconButton from '../../components/NavigationRoundIconButton';
import { ImageTimeSlots } from '../../model/TimeSlots';
import { INTERFACE_DATA_USE_QUEY_KEY } from '../../use_query/useQueryInterface';
import { useQueryCurrentPosition } from '../../use_query/useQueryNQTR';
import { useMyNavigate } from '../../utils/navigate-utility';

export default function QuickRooms() {
    const { data: { currentRoom, currentLocation } = {} } = useQueryCurrentPosition()
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
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
                {currentLocation?.getRooms().map((room) => {
                    let renderImage = room.renderIcon || room.renderImage
                    let disabled = room.disabled
                    let selected = room.id === currentRoom?.id
                    if (!renderImage) {
                        return
                    }
                    let image = renderImage({
                        navigate: navigate,
                        t: t,
                        notify: (message, variant) => enqueueSnackbar(message, { variant }),
                    })
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <NavigationRoundIconButton
                                key={"room" + room.id}
                                disabled={disabled || selected}
                                selected={selected}
                                onClick={() => {
                                    if (!disabled) {
                                        setCurrentRoom(room)
                                        let r = getCurrentRoom()
                                        if (r && r.id !== currentRoom?.id) {
                                            queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                                        }
                                    }
                                }}
                                ariaLabel={room.name}
                            >
                                {image && <ImageSrc image={image ?? ""} />}
                                {image && <ImageBackdrop />}
                            </NavigationRoundIconButton>
                        )
                    }
                    else if (isValidElement(image)) {
                        return image
                    }
                })}
            </AnimatePresence>
        </StackOverflow>
    );
}
