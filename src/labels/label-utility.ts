import { OnRunProps } from "@drincs/nqtr";
import { Label, narration, newLabel, StepLabelResultType } from "@drincs/pixi-vn";

/**
 * Navigates to the narration route and jumps to the given label.
 */
const navigareNarrationRouteLabel = newLabel<{
    labelToOpen: Label | string;
    route: string;
}>("navigare_narration_route", [
    async (props) => {
        await props.navigate(props.route);
        await narration.jump(props.labelToOpen, props);
        await new Promise((resolve) => setTimeout(resolve, 200));
    },
]);
export async function navigateAndJumpToLabel(
    label: Label | string,
    route: string,
    props: OnRunProps
): Promise<StepLabelResultType> {
    return await narration.jump(navigareNarrationRouteLabel, { ...props, labelToOpen: label, route: route });
}
