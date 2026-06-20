import { ActivityNavButton } from "@/components/screens/navigation/quick-activities";
import Commitment from "@/models/nqtr/Commitment";
import TimeSlotsImage from "@/models/TimeSlotsImage";
import { RegisteredCommitments, routine, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import { MessageCircleQuestion } from "lucide-react";

export const aliceSleep = new Commitment("alice_sleep", "alice", {
    priority: 1,
    timeSlot: {
        from: 20,
        to: 10,
    },
    background: "alice_roomsleep0A",
    name: "Alice sleeps",
    icon: (commitment, props) => {
        return (
            <ActivityNavButton
                disabled={commitment.disabled}
                onClick={() => {
                    commitment.run(props);
                }}
                ariaLabel={commitment.name}
            >
                <MessageCircleQuestion className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
            </ActivityNavButton>
        );
    },
    onRun: async (_, props) => {
        await props.navigate({ to: "/game/narration" });
        await narration.jump("talk-alice-sleep", props);
    },
});

export const aliceGoSchool = new Commitment("alice_go_school", "alice", {
    timeSlot: {
        from: 8,
        to: 14,
    },
    name: "Alice goes to school",
    hidden: () => timeTracker.isWeekend,
    priority: 2,
});

export const aliceSmokes = new Commitment("alice_smokes", "alice", {
    timeSlot: {
        from: 10,
        to: 20,
    },
    background: "alice_terrace0A",
    name: "Alice smokes",
    icon: (commitment, props) => {
        return (
            <ActivityNavButton
                disabled={commitment.disabled}
                onClick={() => {
                    commitment.run(props);
                }}
                ariaLabel={commitment.name}
            >
                <MessageCircleQuestion className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
            </ActivityNavButton>
        );
    },
    onRun: async (_, props) => {
        await props.navigate({ to: "/game/narration" });
        await narration.jump("alice-talk-menu", props);
    },
});

const aliceQuest_talk = new Commitment("alice_quest_talk", "alice", {
    timeSlot: {
        from: 10,
        to: 20,
    },
    image: new TimeSlotsImage("alice_terrace0A"),
    executionType: "automatic",
    priority: 1,
    onRun: async (_, props) => {
        await props.navigate({ to: "/game/narration" });
        await narration.jump("talk-alice", props);
        routine.remove("alice_quest_talk");
    },
    name: "Talk to Alice",
});

RegisteredCommitments.add(aliceSleep, aliceGoSchool, aliceSmokes, aliceQuest_talk);
