import { aliceQuest } from "@/content/quests/alice.quest";
import { navigator, timeTracker } from "@drincs/nqtr";
import { newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start", [
    async (props) => {
        navigator.currentRoom = "mc_room";
        timeTracker.currentTime = 8;
        await aliceQuest.start(props);
        await props.navigate({ to: "/game/navigation" });
    },
]);
