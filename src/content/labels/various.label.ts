import { BACKGROUND_ID } from "@/constants";
import { alice, mc } from "@/content/characters";
import { aliceQuest } from "@/content/quests/alice.quest";
import { mcRoom, mcRoomBackground, terrace } from "@/content/rooms";
import {
    narration,
    newChoiceOption,
    newCloseChoiceOption,
    newLabel,
    showImage,
    type StoredChoiceInterface,
} from "@drincs/pixi-vn";

export const orderProductLabel = newLabel("order-product", [
    async () => {
        await showImage(BACKGROUND_ID, mcRoomBackground.src);
        narration.dialogue = { character: mc, text: `OK! Let's see, let's look for a book....` };
    },
    (props) => {
        narration.dialogue = {
            character: mc,
            text: `Here's R****, for $1. Just the thing for me.`,
        };
        mcRoom.removeActivity("order_product");
        aliceQuest.continue(props);
    },
]);

export const takeKeyLabel = newLabel("take-key", [
    (props) => {
        narration.dialogue = {
            character: mc,
            text: `Are these the car keys?! Well... I should try to access the car!`,
        };
        terrace.removeActivity("take_product");
        aliceQuest.continue(props);
    },
]);

const talkSleepResultLabel = newLabel("talk-alice-sleep-result", [
    () => {
        narration.dialogue = { character: alice, text: `${mc.name}!!!! What are you doing?!!` };
    },
    () => {
        narration.dialogue = { character: alice, text: "Get out of here! Now!" };
    },
]);
export const talkSleepLabel = newLabel("talk-alice-sleep", [
    async () => {
        await showImage(BACKGROUND_ID, "alice_roomsleep0A");
        narration.dialogue = { character: alice, text: "zZz zZz ..." };
        narration.choices = [
            newChoiceOption("Try waking up", talkSleepResultLabel, {}),
            newCloseChoiceOption("Leave her alone"),
        ];
    },
]);

export const talkAliceQuest = newLabel(
    "talk-alice",
    () => {
        if (aliceQuest.currentStageIndex === 0) {
            return [
                async () => {
                    narration.dialogue = {
                        character: alice,
                        text: "Hi, can you order me a new book from pc?",
                    };
                },
                () => {
                    narration.dialogue = { character: mc, text: "Ok" };
                },
                () => {
                    narration.dialogue = { character: alice, text: "Thanks" };
                },
                (props) => {
                    aliceQuest.continue(props);
                    narration.continue(props);
                },
            ];
        } else if (aliceQuest.currentStageIndex === 1) {
            return [
                async () => {
                    narration.dialogue = {
                        character: mc,
                        text: "What book do you want me to order?",
                    };
                },
                () => {
                    narration.dialogue = { character: alice, text: "For me it is the same." };
                },
            ];
        } else if (aliceQuest.currentStageIndex === 2) {
            return [
                async () => {
                    narration.dialogue = {
                        character: mc,
                        text: "I ordered the Book, hope you enjoy it.",
                    };
                },
                () => {
                    narration.dialogue = {
                        character: alice,
                        text: "Great, when it arrives remember to bring it to me.",
                    };
                },
            ];
        } else if (aliceQuest.currentStageIndex === 3) {
            return [
                async () => {
                    narration.dialogue = { character: mc, text: "Here's your book." };
                },
                () => {
                    narration.dialogue = {
                        character: alice,
                        text: "Thank you, I can finally read something new.",
                    };
                },
                (props) => {
                    aliceQuest.continue(props);
                    narration.continue(props);
                },
            ];
        }
        return [
            () => {
                narration.dialogue = { character: alice, text: "Thanks for the book." };
            },
        ];
    },
    {
        onStepStart: async (stepIndex) => {
            if (stepIndex === 0) {
                await showImage(BACKGROUND_ID, "alice_terrace0At");
            }
        },
    },
);
export const aliceTalkMenuLabel = newLabel("alice-talk-menu", [
    async () => {
        await showImage(BACKGROUND_ID, "alice_terrace0At");
        narration.dialogue = { character: alice, text: "Hi, what do you want to talk about?" };
        const optionsMenu: StoredChoiceInterface[] = [];
        if (aliceQuest.started) {
            optionsMenu.push(newChoiceOption("About the book", talkAliceQuest, {}));
        }
        narration.choices = [...optionsMenu, newCloseChoiceOption("Cancel")];
    },
]);
