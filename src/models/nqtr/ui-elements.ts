import { OnRunProps } from "@drincs/nqtr";
import { ContainerChild } from "@drincs/pixi-vn/pixi.js";
import { ReactElement } from "react";
import TimeSlotsImage from "../TimeSlotsImage";

export type PixiUIProp =
    | TimeSlotsImage
    | string
    | ContainerChild
    | ((props: OnRunProps) => ContainerChild | Promise<ContainerChild>);
export type PixiUIParam<T> =
    | TimeSlotsImage
    | string
    | ContainerChild
    | ((props: T, runProps: OnRunProps) => ContainerChild | Promise<ContainerChild>);
export type ReactUIProp = ReactElement | ((props: OnRunProps) => ReactElement);
export type ReactUIParam<T> = ReactElement | ((props: T, runProps: OnRunProps) => ReactElement);
