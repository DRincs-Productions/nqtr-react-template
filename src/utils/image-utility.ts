import { OnRunProps } from "@drincs/nqtr";
import MultiTypeSprite from "../models/MultiTypeSprite";
import TimeSlotsImage from "../models/TimeSlotsImage";

export async function convertMultiTypeSprite(sprite: MultiTypeSprite, props: OnRunProps) {
    if (typeof sprite === "function") {
        sprite = await sprite(props);
    }
    if (sprite instanceof TimeSlotsImage) {
        sprite = sprite.src;
    }
    return sprite;
}
