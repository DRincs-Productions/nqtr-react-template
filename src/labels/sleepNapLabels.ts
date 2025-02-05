import { navigator } from "@drincs/nqtr";
import { ChoiceMenuOption, ChoiceMenuOptionClose, narration, newLabel, showImage } from "@drincs/pixi-vn";
import { sleep, wait } from "../utils/time-utility";
import { BACKGROUND_ID } from "../values/constants";

const sleepHourLabel = newLabel<{
    hour: number;
}>("Sleep1HourLabel", [
    ({ hour: wakeupHour, ...rest }) => {
        sleep(wakeupHour, rest);
        narration.goNext(rest);
    },
]);

const napHourLabel = newLabel<{
    hour: number;
}>("Nap1HourLabel", [
    ({ hour, ...rest }) => {
        wait(hour, rest.notify);
        narration.goNext(rest);
    },
]);

export const sleepLabel = newLabel("SleepLabel", [
    ({ t }) => {
        showImage(BACKGROUND_ID, navigator.currentRoom?.image.src);
        narration.dialogue = "What time do you want to set the alarm?";
        narration.choiceMenuOptions = [
            new ChoiceMenuOption(t("allarm_menu_item", { hour: 8 }), sleepHourLabel, { hour: 8 }),
            new ChoiceMenuOption(t("allarm_menu_item", { hour: 9 }), sleepHourLabel, { hour: 9 }),
            new ChoiceMenuOption(t("allarm_menu_item", { hour: 10 }), sleepHourLabel, { hour: 10 }),
            new ChoiceMenuOptionClose("Cancel"),
        ];
    },
]);

export const napLabel = newLabel("NapLabel", [
    ({ t }) => {
        showImage(BACKGROUND_ID, navigator.currentRoom?.image.src);
        narration.dialogue = "You are tired and decide to take a nap.";
        narration.choiceMenuOptions = [
            new ChoiceMenuOption(t("nap_menu_item", { hour: 3 }), napHourLabel, { hour: 3 }),
            new ChoiceMenuOption(t("sleep"), sleepLabel, { hour: 3 }),
            new ChoiceMenuOptionClose("Cancel"),
        ];
    },
]);
