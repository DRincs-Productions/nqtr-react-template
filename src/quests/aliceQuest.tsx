import { addCommitment, CommitmentBaseModel, newQuest, removeCommitment, saveCommitment, Stage } from "@drincs/nqtr";
import { callLabelWithGoNavigationCallBack } from "../labels/navigationCallBackLabel";
import { aliceTalkMenuLabel } from "../labels/variousActionsLabels";
import { alice } from "../values/characters";
import { terrace } from "../values/rooms";

const talkAlice1Commit = new CommitmentBaseModel("talk_alice1", alice, terrace, {
    fromHour: 10,
    toHour: 20,
    renderImage: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0A.webp',
    executionType: "automatic",
    priority: 10,
    onRun: (_, event) => {
        event.navigate("/game")
        callLabelWithGoNavigationCallBack(aliceTalkMenuLabel, event)
        removeCommitment(talkAlice1Commit)
    },
})

const talkAlice1Stage = new Stage("talk_alice1", {
    onStart: () => {
        addCommitment(talkAlice1Commit)
    },
    name: "Talk to Alice",
    description: "Talk to Alice on the terrace",
})

export const aliceQuest = newQuest("aliceQuest",
    [
        talkAlice1Stage
    ],
    {
        name: "Help Alice",
    }
)

saveCommitment(talkAlice1Commit)
