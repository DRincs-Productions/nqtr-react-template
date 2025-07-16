import { routine, timeTracker } from "@drincs/nqtr";
import { Assets, canvas, Container, Game, storage } from "@drincs/pixi-vn";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CANVAS_UI_LAYER_NAME, NAVIGATION_ROUTE, timeSlots } from "./constans";
import "./index.css";
import { fixedRoutine } from "./values/routine";

// Canvas setup with PIXI
const body = document.body;
if (!body) {
    throw new Error("body element not found");
}

Game.init(body, {
    height: 1080,
    width: 1920,
    backgroundColor: "#303030",
}).then(() => {
    // Pixi.JS UI Layer
    canvas.addLayer(CANVAS_UI_LAYER_NAME, new Container());

    // React setup with ReactDOM
    const root = document.getElementById("root");
    if (!root) {
        throw new Error("root element not found");
    }

    const htmlLayout = canvas.addHtmlLayer("ui", root);
    if (!htmlLayout) {
        throw new Error("htmlLayout not found");
    }
    const reactRoot = createRoot(htmlLayout);

    reactRoot.render(<App />);
});

Game.onEnd(async (props) => {
    let isTheEnd = storage.getFlag("is_the_end");
    if (isTheEnd) {
        Game.clear();
        props.navigate("/");
    } else {
        props.navigate(NAVIGATION_ROUTE);
    }
});

Game.onError((type, error, { notify, t }) => {
    notify(t("allert_error_occurred"), { variant: "error" });
    console.error(`Error occurred: ${type}`, error);
});

Game.onLoadingLabel((_stepId, { id }) => Assets.backgroundLoadBundle(id));

timeTracker.initialize({
    defaultTimeSpent: 1,
    maxDayHours: 24,
    minDayHours: 0,
    timeSlots: [
        { name: timeSlots.morning.description, startHour: timeSlots.morning.value },
        { name: timeSlots.afternoon.description, startHour: timeSlots.afternoon.value },
        { name: timeSlots.evening.description, startHour: timeSlots.evening.value },
        { name: timeSlots.night.description, startHour: timeSlots.night.value },
    ],
    weekDaysNames: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    weekendStartDay: 6,
    weekLength: 7,
});

routine.fixedRoutine = fixedRoutine;
