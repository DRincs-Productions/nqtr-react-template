import { Label, narration, newLabel } from "@drincs/pixi-vn";
import { NARRATION_ROUTE } from "../constans";

/**
 * Navigates to the narration route and jumps to the given label.
 */
export const navigareNarrationRouteLabel = newLabel<{
    labelToOpen: Label;
}>("navigare_narration_route", [
    async (props) => {
        await props.navigate(NARRATION_ROUTE);
        await narration.jumpLabel(props.labelToOpen, props);
        await new Promise((resolve) => setTimeout(resolve, 200));
    },
]);
