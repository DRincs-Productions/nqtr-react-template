import { navigator, timeTracker } from "@drincs/nqtr";
import { newLabel, storage } from "@drincs/pixi-vn";
import { NAVIGATION_ROUTE } from "../constans";
import { aliceQuest } from "../quests/aliceQuest";
import { mcRoom } from "../values/rooms";

const startLabel = newLabel("start", [
    (props) => {
        navigator.currentRoom = mcRoom;
        storage.setFlag("weekend", timeTracker.isWeekend);
        storage.setFlag("not_weekend", !timeTracker.isWeekend);
        aliceQuest.start(props);
        props.navigate(NAVIGATION_ROUTE);
    },
]);
export default startLabel;
