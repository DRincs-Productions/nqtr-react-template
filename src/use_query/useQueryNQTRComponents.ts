import { getCurrenrLocation, getCurrentRoom, RoomBaseModel } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useMyNavigate } from "../utils/navigate-utility";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

type IconType = {
	icon: {
		src: string,
		type: "image",
	} | {
		src: ReactElement,
		type: "react",
	}
	disabled: boolean,
	selected: boolean,
	room: RoomBaseModel,
}

const QUICK_ROOMS_USE_QUEY_KEY = "quick_rooms_use_quey_key";
export function useQueryQuickRooms() {
	const navigate = useMyNavigate();
	const { t } = useTranslation(["ui"]);
	const { enqueueSnackbar } = useSnackbar();
	return useQuery({
		queryKey: [INTERFACE_DATA_USE_QUEY_KEY, QUICK_ROOMS_USE_QUEY_KEY],
		queryFn: () => {
			let icons: IconType[] = []
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
					addReactComponent: (conponent) => icons.push({
						icon: { src: conponent, type: "react" },
						disabled,
						selected,
						room: room,
					}),
					addImageData: (image) => icons.push({
						icon: {
							src: typeof image === "string" ? image : image.src,
							type: "image",
						},
						disabled,
						selected,
						room: room,
					}),
				})
			})
			return icons
		},
	});
}
