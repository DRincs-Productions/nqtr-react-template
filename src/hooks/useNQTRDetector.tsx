import { canvas, CanvasBase, CanvasContainer, CanvasImage } from '@drincs/pixi-vn';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageTimeSlots } from '../model/TimeSlots';
import { useQueryCurrentPosition, useQueryTime } from '../use_query/useQueryNQTR';
import { useMyNavigate } from '../utils/navigate-utility';
import { BACKGROUND_ID } from '../values/constants';

export default function useNQTRDetector() {
    const navigate = useMyNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation(["translation"]);
    const { data: { currentRoom } = {} } = useQueryCurrentPosition()
    const { data: hour } = useQueryTime()

    useEffect(() => {
        if (!currentRoom) {
            return
        }
        let currentCommitments = currentRoom.getRoutine()
        if (currentRoom.renderImage) {
            let backgroundImage = currentRoom.renderImage({
                navigate: navigate,
                t: t,
                notify: (message, variant) => enqueueSnackbar(message, { variant }),
            })
            if (currentCommitments.length > 0 && currentCommitments[0].renderImage) {
                backgroundImage = currentCommitments[0].renderImage({
                    navigate: navigate,
                    t: t,
                    notify: (message, variant) => enqueueSnackbar(message, { variant }),
                })
            }
            let container = new CanvasContainer()
            if (backgroundImage instanceof CanvasBase) {
                container.addChild(backgroundImage)
            }
            if (backgroundImage instanceof ImageTimeSlots) {
                backgroundImage = backgroundImage.currentImage
            }
            if (typeof backgroundImage === 'string') {
                let image = new CanvasImage({}, backgroundImage)
                image.load()
                container.addChild(image)
            }

            currentRoom.location.getRooms().forEach((room) => {
                if (!room.renderIcon) {
                    return
                }
                let icon = room.renderIcon({
                    navigate: navigate,
                    t: t,
                    notify: (message, variant) => enqueueSnackbar(message, { variant }),
                })
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            currentRoom.activities.forEach((activity) => {
                if (!activity.renderIcon) {
                    return
                }
                let icon = activity.renderIcon({
                    navigate: navigate,
                    t: t,
                    notify: (message, variant) => enqueueSnackbar(message, { variant }),
                })
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            currentCommitments.forEach((commitment) => {
                if (!commitment.renderIcon) {
                    return
                }
                let icon = commitment.renderIcon({
                    navigate: navigate,
                    t: t,
                    notify: (message, variant) => enqueueSnackbar(message, { variant }),
                })
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            let automaticCommitment = currentCommitments.find((commitment) => commitment.executionType === "automatic")
            if (automaticCommitment && automaticCommitment.run) {
                automaticCommitment.run({
                    navigate: navigate,
                    t: t,
                    notify: (message, variant) => enqueueSnackbar(message, { variant }),
                })
            }

            canvas.add(BACKGROUND_ID, container)
        }
    }, [currentRoom, hour])

    return null
}
