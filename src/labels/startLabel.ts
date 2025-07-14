import { navigator, timeTracker } from "@drincs/nqtr";
import { newLabel } from "@drincs/pixi-vn";
import { NAVIGATION_ROUTE } from "../constans";
import { aliceQuest } from "../values/quests/aliceQuest";
import { mcRoom } from "../values/rooms";

const startLabel = newLabel("start", [
    async (props) => {
        navigator.currentRoom = mcRoom;
        await aliceQuest.start(props);
        await props.navigate(NAVIGATION_ROUTE);
        timeTracker.currentTime = 8;
    },
]);
export default startLabel;
