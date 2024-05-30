import { getCurrenrLocation, getCurrentCommitments, getCurrentRoom, setCurrentRoom, TimeManager } from '@drincs/nqtr';
import { CanvasBase, CanvasContainer, CanvasImage, GameWindowManager } from '@drincs/pixi-vn';
import { Grid, ImageBackdrop, ImageSrc, StackOverflow } from '@drincs/react-components';
import { isValidElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentLocationCommitmentsState } from '../atoms/currentLocationCommitmentsState';
import { currentLocationState } from '../atoms/currentLocationState';
import { currentRoomState } from '../atoms/currentRoomState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import NavigationRoundIconButton from '../components/NavigationRoundIconButton';
import { ImageTimeSlots } from '../model/TimeSlots';
import { useMyNavigate } from '../utility/useMyNavigate';
import { BACKGROUND_ID } from '../values/constants';
import Time from './Time';

export default function Navigation() {
    const [currentLocation, setAtomCurrentLocation] = useRecoilState(currentLocationState)
    const [currentRoom, setAtomCurrentRoom] = useRecoilState(currentRoomState)
    const [currentLocationCommitments, setCurrentLocationCommitments] = useRecoilState(currentLocationCommitmentsState)
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const [hour, setHour] = useState(TimeManager.currentHour)
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        let location = getCurrenrLocation()
        if (location) {
            setAtomCurrentLocation(location)
        }
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        let room = getCurrentRoom()
        if (room) {
            setAtomCurrentRoom(room)
        }
    }, [currentLocation])

    useEffect(() => {
        let locationCommitments = getCurrentCommitments().filter((commitment) => {
            return commitment.room.location.id === currentLocation?.id
        })
        setCurrentLocationCommitments(locationCommitments)
    }, [currentRoom, hour])

    useEffect(() => {
        if (currentRoom.renderImage) {
            let backgroundImage = currentRoom.renderImage()
            let container = new CanvasContainer()
            if (backgroundImage instanceof CanvasBase) {
                container.addChild(backgroundImage)
            }
            if (backgroundImage instanceof ImageTimeSlots) {
                backgroundImage = backgroundImage.currentImage
            }
            if (typeof backgroundImage === 'string') {
                let image = new CanvasImage()
                image.imageLink = backgroundImage
                image.load()
                container.addChild(image)
            }

            currentRoom.location.getRooms().forEach((room) => {
                if (!room.renderIcon) {
                    return
                }
                let icon = room.renderIcon()
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            currentRoom.activities.forEach((activity) => {
                if (!activity.renderIcon) {
                    return
                }
                let icon = activity.renderIcon()
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            GameWindowManager.addCanvasElement(BACKGROUND_ID, container)
        }
    }, [currentRoom, currentLocationCommitments])

    return (
        <>
            <Time hour={hour} setHour={setHour} />
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
                {currentLocation.getRooms().map((room) => {
                    let renderImage = room.renderIcon || room.renderImage
                    let disabled = room.disabled
                    let selected = room.id === currentRoom?.id
                    if (!renderImage) {
                        return
                    }
                    let image = renderImage()
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <NavigationRoundIconButton
                                disabled={disabled || selected}
                                selected={selected}
                                onClick={() => {
                                    if (!disabled) {
                                        setCurrentRoom(room)
                                        let r = getCurrentRoom()
                                        if (r && r.id !== currentRoom.id) {
                                            setAtomCurrentRoom(r)
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
                })}
            </StackOverflow>
            {currentLocation.getRooms().map((room) => {
                let renderImage = room.renderIcon || room.renderImage
                if (!renderImage) {
                    return
                }
                let image = renderImage()
                // if image is a JSX.Element
                if (image instanceof Element) {
                    return image
                }
            })}
            <StackOverflow
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                maxLeght={"100%"}
                sx={{
                    display: 'flex',
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    pointerEvents: "auto",
                }}
            >
                {currentRoom.activities.map((activity, index) => {
                    let renderImage = activity.renderIcon
                    if (!renderImage) {
                        return
                    }
                    let image = renderImage({
                        navigate: navigate,
                        t: t,
                    })
                    let disabled = activity.disabled
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <Grid
                                paddingY={0}
                                key={index}
                            >
                                <NavigationRoundIconButton
                                    disabled={disabled}
                                    onClick={() => {
                                        activity.onRun({
                                            navigate: navigate,
                                            t: t,
                                        })
                                    }}
                                    ariaLabel={activity.name}
                                >
                                    {image && <ImageSrc image={image ?? ""} />}
                                    {image && <ImageBackdrop />}
                                </NavigationRoundIconButton>
                            </Grid>
                        )
                    }
                    else if (isValidElement(image)) {
                        return image
                    }
                })}
            </StackOverflow>
        </>
    );
}
