import { getCurrenrLocation, getCurrentRoom, setCurrentRoom } from "@drincs/nqtr";
import { CanvasBaseItem } from "@drincs/pixi-vn";
import { ImageBackdrop, ImageSrc } from "@drincs/react-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { isValidElement, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { ImageTimeSlots } from "../model/TimeSlots";
import { useMyNavigate } from "../utils/navigate-utility";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
	const navigate = useMyNavigate();
	const { t } = useTranslation(["ui"]);
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient()
	return useQuery({
		queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
		queryFn: () => {
			let reactComponents: ReactElement[] = []
			let canvasComponents: CanvasBaseItem<any>[] = []
			let images: ImageTimeSlots[] = []
			let currentRoom = getCurrentRoom()
			getCurrenrLocation()?.getRooms().forEach((room) => {
				let renderImage = room.renderIcon || room.renderImage
				let disabled = room.disabled
				let selected = room.id === currentRoom?.id
				if (!renderImage) {
					return
				}
				renderImage({
					navigate: navigate,
					t: t,
					notify: (message, variant) => enqueueSnackbar(message, { variant }),
					addReactComponent: (component) => {
						reactComponents.push(component)
					},
					addCanvasComponent: (component) => {
						canvasComponents.push(component)
					},
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
			})
			return { reactComponents, canvasComponents, images }
		},
	});
}
