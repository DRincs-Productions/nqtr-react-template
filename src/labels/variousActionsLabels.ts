import {
    narration,
    newChoiceOption,
    newCloseChoiceOption,
    newLabel,
    showImage,
    StoredChoiceInterface,
} from "@drincs/pixi-vn";
import { BACKGROUND_ID } from "../constans";
import { alice, mc } from "../values/characters";
import { aliceQuest } from "../values/quests";
import { ALICE_TALK_MENU_LABEL_KEY, TALK_ALICE_QUEST_KEY } from "./variousActionsLabelKeys";

export const talkAliceQuest = newLabel(
    TALK_ALICE_QUEST_KEY,
    () => {
        if (aliceQuest.currentStageIndex == 0) {
            return [
                async () => {
                    narration.dialogue = { character: alice, text: "Hi, can you order me a new book from pc?" };
                },
                () => {
                    narration.dialogue = { character: alice, text: "Ok" };
                },
                () => {
                    narration.dialogue = { character: alice, text: "Thanks" };
                },
                (props) => {
                    aliceQuest.goNext(props);
                    narration.continue(props);
                },
            ];
        } else if (aliceQuest.currentStageIndex == 1) {
            return [
                async () => {
                    narration.dialogue = { character: mc, text: "What book do you want me to order?" };
                },
                () => {
                    narration.dialogue = { character: alice, text: "For me it is the same." };
                },
            ];
        } else if (aliceQuest.currentStageIndex == 2) {
            return [
                async () => {
                    narration.dialogue = { character: mc, text: "I ordered the Book, hope you enjoy it." };
                },
                () => {
                    narration.dialogue = {
                        character: alice,
                        text: "Great, when it arrives remember to bring it to me.",
                    };
                },
            ];
        } else if (aliceQuest.currentStageIndex == 3) {
            return [
                async () => {
                    narration.dialogue = { character: mc, text: "Here's your book." };
                },
                () => {
                    narration.dialogue = { character: alice, text: "Thank you, I can finally read something new." };
                },
                (props) => {
                    aliceQuest.goNext(props);
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
            if (stepIndex == 0) {
                await showImage(BACKGROUND_ID, "alice_terrace0At");
            }
        },
    },
);
export const aliceTalkMenuLabel = newLabel(ALICE_TALK_MENU_LABEL_KEY, [
    async () => {
        await showImage(BACKGROUND_ID, "alice_terrace0At");
        narration.dialogue = { character: alice, text: "Hi, what do you want to talk about?" };
        let optionsMenu: StoredChoiceInterface[] = [];
        if (aliceQuest.started) {
            optionsMenu.push(newChoiceOption("About the book", talkAliceQuest, {}));
        }
        narration.choices = [...optionsMenu, newCloseChoiceOption("Cancel")];
    },
]);
