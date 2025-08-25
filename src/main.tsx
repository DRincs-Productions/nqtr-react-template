import { Assets, canvas, Container, Game, storage } from "@drincs/pixi-vn";
import { setupInkHmrListener } from "@drincs/pixi-vn-ink/vite-listener";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CANVAS_UI_LAYER_NAME, NAVIGATION_ROUTE } from "./constans";
import "./index.css";

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

setupInkHmrListener();
