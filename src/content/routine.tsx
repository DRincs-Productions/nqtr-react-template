import NavigationButton from "@/components/scrrens/navigation/buttons";
import { alice } from "@/content/characters";
import Commitment from "@/models/nqtr/Commitment";
import { RegisteredCommitments, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import { MessageCircleQuestion } from "lucide-react";

export const aliceSleep = new Commitment("alice_sleep", alice, {
    priority: 1,
    timeSlot: {
        from: 20,
        to: 10,
    },
    background: "alice_roomsleep0A",
    icon: (commitment, props) => {
        return (
            <NavigationButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
            >
                <MessageCircleQuestion className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
            </NavigationButton>
        );
    },
    onRun: async (_, event) => {
        await event.navigate({ to: "/game/narration" });
        await narration.jump("talk-alice-sleep", event);
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
            <NavigationButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
            >
                <MessageCircleQuestion className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
            </NavigationButton>
        );
    },
    onRun: async (_, event) => {
        await event.navigate({ to: "/game/narration" });
        await narration.jump("alice-talk-menu", event);
    },
});

RegisteredCommitments.add([aliceSleep, aliceGoSchool, aliceSmokes]);
