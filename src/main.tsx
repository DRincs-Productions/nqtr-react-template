import { routine, timeTracker } from "@drincs/nqtr";
import { canvas, clearAllGameDatas, Container, narration, storage } from "@drincs/pixi-vn";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CANVAS_UI_LAYER_NAME, NAVIGATION_ROUTE } from "./constans";
import "./index.css";
import "./values/characters";
import { timeSlots } from "./values/constants";
import { fixedRoutine } from "./values/routine";

// Canvas setup with PIXI
const body = document.body;
if (!body) {
    throw new Error("body element not found");
}

canvas
    .initialize(body, 1920, 1080, {
        backgroundColor: "#303030",
    })
    .then(() => {
        // Pixi.JS UI Layer
        canvas.addLayer(CANVAS_UI_LAYER_NAME, new Container());

        // React setup with ReactDOM
        const root = document.getElementById("root");
        if (!root) {
            throw new Error("root element not found");
        }

        canvas.initializeHTMLLayout(root);
        if (!canvas.htmlLayout) {
            throw new Error("htmlLayout not found");
        }
        const reactRoot = createRoot(canvas.htmlLayout);

        reactRoot.render(<App />);
    });

narration.onGameEnd = async (props) => {
    let isTheEnd = storage.getFlag("is_the_end");
    if (isTheEnd) {
        clearAllGameDatas();
        props.navigate("/");
    } else {
        props.navigate(NAVIGATION_ROUTE);
    }
};

narration.onStepError = async (_error, { notify, t }) => {
    notify(t("allert_error_occurred"), { variant: "error" });
};

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
