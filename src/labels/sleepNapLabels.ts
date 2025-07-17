import { navigator } from "@drincs/nqtr";
import { canvas, narration, newChoiceOption, newCloseChoiceOption, newLabel, showImage } from "@drincs/pixi-vn";
import { BACKGROUND_ID } from "../constans";
import { convertMultiTypeSprite } from "../utils/image-utility";

const sleepHourLabel = newLabel<{
    hour: number;
}>("Sleep1HourLabel", [
    ({ hour: wakeupHour, ...props }) => {
        props.sleep(wakeupHour, props);
        narration.goNext(props);
    },
]);

const napHourLabel = newLabel<{
    hour: number;
}>("Nap1HourLabel", [
    ({ hour, ...props }) => {
        props.wait(hour);
        narration.goNext(props);
    },
]);

export const sleepLabel = newLabel("SleepLabel", [
    async (props) => {
        const currentRoom = navigator.currentRoom;
        if (currentRoom) {
            const bg = convertMultiTypeSprite(currentRoom.background, props);
            if (typeof bg === "string") {
                await showImage(BACKGROUND_ID, bg);
            } else {
                canvas.add(BACKGROUND_ID, bg);
            }
        }
        narration.dialogue = "What time do you want to set the alarm?";
        narration.choiceMenuOptions = [
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 8 }), sleepHourLabel, { hour: 8 }),
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 9 }), sleepHourLabel, { hour: 9 }),
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 10 }), sleepHourLabel, { hour: 10 }),
            newCloseChoiceOption("Cancel"),
        ];
    },
]);

export const napLabel = newLabel("NapLabel", [
    async (props) => {
        const currentRoom = navigator.currentRoom;
        if (currentRoom) {
            const bg = convertMultiTypeSprite(currentRoom.background, props);
            if (typeof bg === "string") {
                await showImage(BACKGROUND_ID, bg);
            } else {
                canvas.add(BACKGROUND_ID, bg);
            }
        }
        narration.dialogue = "You are tired and decide to take a nap.";
        narration.choiceMenuOptions = [
            newChoiceOption(props.uiTransition("nap_menu_item", { hour: 3 }), napHourLabel, { hour: 3 }),
            newChoiceOption(props.uiTransition("sleep"), sleepLabel, { hour: 3 }),
            newCloseChoiceOption("Cancel"),
        ];
    },
]);
