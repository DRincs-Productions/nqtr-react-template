import { OnRunProps } from "@drincs/nqtr";
import { ContainerChild } from "@drincs/pixi-vn";
import TimeSlotsImage from "./TimeSlotsImage";

type MultiTypeImage = TimeSlotsImage | string | ContainerChild | ((props: OnRunProps) => Promise<ContainerChild>);
export default MultiTypeImage;
