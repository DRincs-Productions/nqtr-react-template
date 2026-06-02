import { OnRunProps } from "@drincs/nqtr";
import TimeSlotsImage from "../models/TimeSlotsImage";
import { PixiUIProp } from "../models/nqtr/ui-elements";

export async function normalizePixiElement(element: PixiUIProp, props: OnRunProps) {
    if (typeof element === "function") {
        element = await element(props);
    }
    if (element instanceof TimeSlotsImage) {
        element = element.src;
    }
    return element;
}
