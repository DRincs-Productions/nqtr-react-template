import { RegisteredCommitments, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import { MessageCircleQuestion } from "lucide-react";
import MediaButton from "../components/MediaButton";
import { NARRATION_ROUTE } from "../constans";
import { TALK_SLEEP_LABEL_KEY } from "../labels/variousActionsLabelKeys";
import { aliceTalkMenuLabel } from "../labels/variousActionsLabels";
import Commitment from "../models/nqtr/Commitment";
import { alice } from "./characters";

export const aliceSleep = new Commitment("alice_sleep", alice, {
    priority: 1,
    timeSlot: {
        from: 20,
        to: 10,
    },
    background: "alice_roomsleep0A",
    icon: (commitment, props) => {
        return (
            <MediaButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
            >
                <MessageCircleQuestion className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
            </MediaButton>
        );
    },
    onRun: async (_, event) => {
        await event.navigate(NARRATION_ROUTE);
        await narration.jump(TALK_SLEEP_LABEL_KEY, event);
    },
});

export const aliceGoSchool = new Commitment("alice_go_school", alice, {
    timeSlot: {
        from: 8,
        to: 14,
    },
    hidden: () => timeTracker.isWeekend,
    priority: 2,
});

export const aliceSmokes = new Commitment("alice_smokes", alice, {
    timeSlot: {
        from: 10,
        to: 20,
    },
    background: "alice_terrace0A",
    icon: (commitment, props) => {
        return (
            <MediaButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
            >
                <MessageCircleQuestion className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
            </MediaButton>
        );
    },
    onRun: async (_, event) => {
        await event.navigate(NARRATION_ROUTE);
        await narration.jump(aliceTalkMenuLabel, event);
    },
});

RegisteredCommitments.add([aliceSleep, aliceGoSchool, aliceSmokes]);
