import { navigator } from "@drincs/nqtr";
import { newLabel } from "@drincs/pixi-vn";
import { NAVIGATION_ROUTE } from "../constans";
import { aliceQuest } from "../values/quests";
import { mcRoom } from "../values/rooms";

const startLabel = newLabel("start", [
    (props) => {
        navigator.currentRoom = mcRoom;
        aliceQuest.start(props);
        props.navigate(NAVIGATION_ROUTE);
    },
]);
export default startLabel;
