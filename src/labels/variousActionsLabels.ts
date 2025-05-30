import {
    narration,
    newChoiceOption,
    newCloseChoiceOption,
    newLabel,
    showImage,
    StoredChoiceInterface,
} from "@drincs/pixi-vn";
import { orderProduct, takeProduct } from "../values/activity";
import { mc } from "../values/characters";
import { BACKGROUND_ID } from "../values/constants";
import { aliceQuest } from "../values/quests/alice/quests";
import { mcRoom, terrace } from "../values/rooms";

export const orderProductLabel = newLabel("OrderProductLabel", [
    () => {
        narration.dialogue = `OK! Let's see, let's look for a book....`;
    },
    (props) => {
        narration.dialogue = `Here's R****, for $1. Just the thing for me.`;
        mcRoom.removeActivity(orderProduct);
        aliceQuest.completeCurrentStageAndGoNext(props);
    },
]);

export const takeKeyLabel = newLabel("TakeKeyLabel", [
    (props) => {
        narration.dialogue = `Are these the car keys?! Well... I should try to access the car!`;
        terrace.removeActivity(takeProduct);
        aliceQuest.completeCurrentStageAndGoNext(props);
    },
]);

const talkSleepResultLabel = newLabel("TalkSleepResultLabel", [
    () => {
        narration.dialogue = mc.name + "!!!! What are you doing?!!";
    },
    () => {
        narration.dialogue = "Get out of here! Now!";
    },
]);
export const talkSleepLabel = newLabel("TalkSleepLabel", [
    async () => {
        await showImage(BACKGROUND_ID, "alice_roomsleep0A");
        narration.dialogue = "zZz zZz ...";
        narration.choiceMenuOptions = [
            newChoiceOption("Try waking up", talkSleepResultLabel, {}),
            newCloseChoiceOption("Leave her alone"),
        ];
    },
]);

export const talkAliceQuest = newLabel(
    "talkAliceQuest",
    () => {
        if (aliceQuest.currentStageIndex == 0) {
            return [
                async () => {
                    narration.dialogue = "Hi, can you order me a new book from pc?";
                },
                () => {
                    narration.dialogue = "Ok";
                },
                () => {
                    narration.dialogue = "Thanks";
                },
                (props) => {
                    aliceQuest.completeCurrentStageAndGoNext(props);
                    narration.goNext(props);
                },
            ];
        } else if (aliceQuest.currentStageIndex == 1) {
            return [
                async () => {
                    narration.dialogue = "What book do you want me to order?";
                },
                () => {
                    narration.dialogue = "For me it is the same.";
                },
            ];
        } else if (aliceQuest.currentStageIndex == 2) {
            return [
                async () => {
                    narration.dialogue = "I ordered the Book, hope you enjoy it.";
                },
                () => {
                    narration.dialogue = "Great, when it arrives remember to bring it to me.";
                },
            ];
        } else if (aliceQuest.currentStageIndex == 3) {
            return [
                async () => {
                    narration.dialogue = "Here's your book.";
                },
                () => {
                    narration.dialogue = "Thank you, I can finally read something new.";
                },
                (props) => {
                    aliceQuest.completeCurrentStageAndGoNext(props);
                    narration.goNext(props);
                },
            ];
        }
        return [
            () => {
                narration.dialogue = "Thanks for the book.";
            },
        ];
    },
    {
        onStepStart: async (stepIndex) => {
            if (stepIndex == 0) {
                await showImage(BACKGROUND_ID, "alice_terrace0At");
            }
        },
    }
);
export const aliceTalkMenuLabel = newLabel("AliceTalkMenuLabel", [
    async () => {
        await showImage(BACKGROUND_ID, "alice_terrace0At");
        narration.dialogue = "Hi, what do you want to talk about?";
        let optionsMenu: StoredChoiceInterface[] = [];
        if (aliceQuest.started) {
            optionsMenu.push(newChoiceOption("About the book", talkAliceQuest, {}));
        }
        narration.choiceMenuOptions = [...optionsMenu, newCloseChoiceOption("Cancel")];
    },
]);
