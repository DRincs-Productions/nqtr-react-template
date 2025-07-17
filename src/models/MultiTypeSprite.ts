import { OnRunProps } from "@drincs/nqtr";
import { ContainerChild } from "@drincs/pixi-vn";
import TimeSlotsImage from "./TimeSlotsImage";

type MultiTypeSprite = TimeSlotsImage | string | ContainerChild | ((props: OnRunProps) => ContainerChild);
export type MultiTypeSpriteProp<T> =
    | TimeSlotsImage
    | string
    | ContainerChild
    | ((props: T, runProps: OnRunProps) => ContainerChild);
export default MultiTypeSprite;
