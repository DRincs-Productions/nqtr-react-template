import { OnRunProps } from "@drincs/nqtr";
import MultiTypeImage from "../models/MultiTypeImage";
import TimeSlotsImage from "../models/TimeSlotsImage";

export async function convertMultiTypeImage(image: MultiTypeImage, props: OnRunProps) {
    if (typeof image === "function") {
        image = await image(props);
    }
    if (image instanceof TimeSlotsImage) {
        image = image.src;
    }
    return image;
}
