import { RegisteredCommitments, RegisteredQuests, routine } from "@drincs/nqtr";
import { NARRATION_ROUTE } from "../../../constans";
import { navigateAndJumpToLabel } from "../../../labels/utility-labels";
import { talkAliceQuest } from "../../../labels/variousActionsLabels";
import ImageTimeSlots from "../../../models/ImageTimeSlots";
import Commitment from "../../../models/nqtr/Commitment";
import Quest from "../../../models/nqtr/Quest";
import Stage from "../../../models/nqtr/Stage";
import { orderProduct, takeProduct } from "../../activity";
import { alice } from "../../characters";
import { mcRoom, terrace } from "../../rooms";

export const aliceQuest = new Quest(
    "aliceQuest",
    [
        // stages
        new Stage("talk_alice1", {
            onStart: () => {
                routine.add(aliceQuest_talk);
            },
            name: "Talk to Alice",
            description: "Talk to Alice on the terrace",
        }),
        new Stage("order_products", {
            onStart: () => {
                mcRoom.addActivity(orderProduct);
            },
            name: "Order products",
            description: "Order the products with your PC",
        }),
        new Stage("take_products", {
            onStart: (_, { notify }) => {
                terrace.addActivity(takeProduct);
                notify("You can take the products on the Terrace");
            },
            name: "Take products",
            description: "Take products on the Terrace",
            requestDescriptionToStart: "Wait for the products you ordered to arrive (2 day)",
            daysRequiredToStart: 2,
        }),
        new Stage("talk_alice2", {
            name: "Talk to Alice",
            description: "Talk to Alice on the terrace",
        }),
    ],
    {
        // props
        name: "Help Alice",
        description:
            'To learn more about how the repo works, Talk to Alice. \nGoing when she is there will automatically start an "Event" (see aliceQuest.tsx to learn more). \nAfter that an action will be added to open the pc, in MC room. \n\n(during the quest you can talk to Alice and you will see her talking during the quests of the same Quest)',
        image: new ImageTimeSlots("alice_terrace0A"),
        onStart: (quest, { notify, uiTransition }) => {
            notify(uiTransition("notify_quest_is_started", { quest: quest.name }));
        },
        onNextStage: (stage, { notify, uiTransition }) => {
            notify(uiTransition("notify_quest_is_updated", { quest: stage.name }));
        },
    }
);

RegisteredQuests.add(aliceQuest);

const aliceQuest_talk = new Commitment("alice_quest_talk", alice, terrace, {
    fromHour: 10,
    toHour: 20,
    image: new ImageTimeSlots("alice_terrace0A"),
    executionType: "automatic",
    priority: 1,
    onRun: async (_, event) => {
        return await navigateAndJumpToLabel(talkAliceQuest, NARRATION_ROUTE, event).then(() => {
            routine.remove(aliceQuest_talk);
        });
    },
});

RegisteredCommitments.add(aliceQuest_talk);
