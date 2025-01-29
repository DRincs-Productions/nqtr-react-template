import { setCurrentRoom, timeTracker } from "@drincs/nqtr";
import { newLabel, setFlag } from "@drincs/pixi-vn";
import { NAVIGATION_ROUTE } from "../constans";
import { aliceQuest } from "../quests/aliceQuest";
import { mcRoom } from "../values/rooms";

const startLabel = newLabel("start", [
    (props) => {
        setCurrentRoom(mcRoom);
        setFlag("weekend", timeTracker.isWeekend);
        setFlag("not_weekend", !timeTracker.isWeekend);
        aliceQuest.start(props);
        props.navigate(NAVIGATION_ROUTE);
    },
]);
export default startLabel;
