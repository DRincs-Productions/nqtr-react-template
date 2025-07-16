import { OnRunProps } from "@drincs/nqtr";
import { ContainerChild } from "@drincs/pixi-vn";
import TimeSlotsImage from "./TimeSlotsImage";

type MultiTypeSprite = TimeSlotsImage | string | ContainerChild | ((props: OnRunProps) => Promise<ContainerChild>);
export type MultiTypeSpriteProp<T> =
    | TimeSlotsImage
    | string
    | ContainerChild
    | ((props: T, runProps: OnRunProps) => Promise<ContainerChild>);
export default MultiTypeSprite;
