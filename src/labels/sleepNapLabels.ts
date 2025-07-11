import { navigator } from "@drincs/nqtr";
import { narration, newChoiceOption, newCloseChoiceOption, newLabel, showImage } from "@drincs/pixi-vn";
import { BACKGROUND_ID } from "../constans";

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
    async ({ uiTransition }) => {
        await showImage(BACKGROUND_ID, navigator.currentRoom?.image.src);
        narration.dialogue = "What time do you want to set the alarm?";
        narration.choiceMenuOptions = [
            newChoiceOption(uiTransition("allarm_menu_item", { hour: 8 }), sleepHourLabel, { hour: 8 }),
            newChoiceOption(uiTransition("allarm_menu_item", { hour: 9 }), sleepHourLabel, { hour: 9 }),
            newChoiceOption(uiTransition("allarm_menu_item", { hour: 10 }), sleepHourLabel, { hour: 10 }),
            newCloseChoiceOption("Cancel"),
        ];
    },
]);

export const napLabel = newLabel("NapLabel", [
    async ({ uiTransition }) => {
        await showImage(BACKGROUND_ID, navigator.currentRoom?.image.src);
        narration.dialogue = "You are tired and decide to take a nap.";
        narration.choiceMenuOptions = [
            newChoiceOption(uiTransition("nap_menu_item", { hour: 3 }), napHourLabel, { hour: 3 }),
            newChoiceOption(uiTransition("sleep"), sleepLabel, { hour: 3 }),
            newCloseChoiceOption("Cancel"),
        ];
    },
]);
