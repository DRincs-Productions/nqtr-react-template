import { BACKGROUND_ID } from "@/constants";
import { mcRoomBackground } from "@/content/rooms";
import {
    narration,
    newChoiceOption,
    newCloseChoiceOption,
    newLabel,
    showImage,
} from "@drincs/pixi-vn";

newLabel<{
    hour: number;
}>("sleep_1_hour", [
    ({ hour: wakeupHour, ...props }) => {
        props.sleep(wakeupHour, props);
        narration.continue(props);
    },
]);

newLabel<{
    hour: number;
}>("nap_1_hour", [
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
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 8 }), "sleep_1_hour", {
                hour: 8,
            }),
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 9 }), "sleep_1_hour", {
                hour: 9,
            }),
            newChoiceOption(props.uiTransition("allarm_menu_item", { hour: 10 }), "sleep_1_hour", {
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
            newChoiceOption(props.uiTransition("nap_menu_item", { hour: 3 }), "nap_1_hour", {
                hour: 3,
            }),
            newChoiceOption(props.uiTransition("sleep"), "sleep", { hour: 3 }),
            newCloseChoiceOption("Cancel"),
        ];
    },
]);
