import { aliceQuest } from "@/content/quests";
import { mcRoom } from "@/content/rooms";
import { navigator, timeTracker } from "@drincs/nqtr";
import { newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start", [
    async (props) => {
        navigator.currentRoom = mcRoom;
        timeTracker.currentTime = 8;
        await aliceQuest.start(props);
        await props.navigate({ to: "/game/navigation" });
    },
]);
