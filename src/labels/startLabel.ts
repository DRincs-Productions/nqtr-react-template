import { navigator, timeTracker } from "@drincs/nqtr";
import { newLabel, storage } from "@drincs/pixi-vn";
import { NAVIGATION_ROUTE, NOT_WEEKEND_FLAG, WEEKEND_FLAG } from "../constans";
import { aliceQuest } from "../quests/aliceQuest";
import { mcRoom } from "../values/rooms";

const startLabel = newLabel("start", [
    (props) => {
        navigator.currentRoom = mcRoom;
        storage.setFlag(WEEKEND_FLAG, timeTracker.isWeekend);
        storage.setFlag(NOT_WEEKEND_FLAG, !timeTracker.isWeekend);
        aliceQuest.start(props);
        props.navigate(NAVIGATION_ROUTE);
    },
]);
export default startLabel;
