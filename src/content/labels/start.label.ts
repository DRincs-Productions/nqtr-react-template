import { navigator, timeTracker } from "@drincs/nqtr";
import { newLabel } from "@drincs/pixi-vn";

const startLabel = newLabel("start", [
    async (props) => {
        navigator.currentRoom = mcRoom;
        timeTracker.currentTime = 8;
        await aliceQuest.start(props);
        await props.navigate(NAVIGATION_ROUTE);
    },
]);
export default startLabel;
