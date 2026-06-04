import { BACKGROUND_ID } from "@/constants";
import { mcRoomBackground } from "@/content/rooms";
import {
    narration,
    newChoiceOption,
    newCloseChoiceOption,
    newLabel,
    showImage,
} from "@drincs/pixi-vn";

const sleepHourLabel = newLabel<{
    hour: number;
}>("sleep-1-hour", [
    ({ hour: wakeupHour, ...props }) => {
        props.sleep(wakeupHour, props);
        narration.continue(props);
    },
]);

const napHourLabel = newLabel<{
    hour: number;
}>("nap-1-hour", [
    ({ hour, ...props }) => {
        props.wait(hour);
        narration.continue(props);
    },
]);

export const sleepLabel = newLabel("sleep", [
    async (props) => {
        await showImage(BACKGROUND_ID, mcRoomBackground.src);
        narration.dialogue = "What time do you want to set the alarm?";
        narration.choices = [
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 8 }), sleepHourLabel, {
                hour: 8,
            }),
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 9 }), sleepHourLabel, {
                hour: 9,
            }),
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 10 }), sleepHourLabel, {
                hour: 10,
            }),
            newCloseChoiceOption("Cancel"),
        ];
    },
]);

export const napLabel = newLabel("nap", [
    async (props) => {
        await showImage(BACKGROUND_ID, mcRoomBackground.src);
        narration.dialogue = "You are tired and decide to take a nap.";
        narration.choices = [
            newChoiceOption(props.uiTransition("nap_menu_item", { hour: 3 }), napHourLabel, {
                hour: 3,
            }),
            newChoiceOption(props.uiTransition("sleep"), sleepLabel, { hour: 3 }),
            newCloseChoiceOption("Cancel"),
        ];
    },
]);
