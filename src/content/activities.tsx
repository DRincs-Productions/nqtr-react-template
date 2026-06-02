import { RegisteredActivities, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import { Bed, Package, ShoppingCart } from "lucide-react";
import NavigationButton from "../components/scrrens/navigation/buttons";
import { NARRATION_ROUTE } from "../constans";
import { napLabel, sleepLabel } from "../labels/sleepNapLabels";
import { ORDER_PRODUCT_LABEL_KEY, TAKE_KEY_LABEL_KEY } from "../labels/variousActionsLabelKeys";
import Activity from "../models/nqtr/Activity";

export const bed = new Activity(
    "bed",
    async (_, props) => {
        await props.navigate(NARRATION_ROUTE);
        if (timeTracker.nowIsBetween(5, 22)) {
            await narration.jump(napLabel, props);
        } else {
            await narration.jump(sleepLabel, props);
        }
    },
    {
        name: "bed",
        icon: (activity, props) => {
            return (
                <NavigationButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props);
                    }}
                    ariaLabel={props.uiTransition(activity.name)}
                >
                    <Bed className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
                </NavigationButton>
            );
        },
    },
);

export const orderProduct = new Activity(
    "order_product",
    async (_, props) => {
        await props.navigate(NARRATION_ROUTE);
        await narration.jump(ORDER_PRODUCT_LABEL_KEY, props);
    },
    {
        name: "order_product",
        icon: (activity, props) => {
            return (
                <NavigationButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props);
                    }}
                    ariaLabel={props.uiTransition(activity.name)}
                >
                    <ShoppingCart className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
                </NavigationButton>
            );
        },
    },
);

export const takeProduct = new Activity(
    "take_product",
    async (_, props) => {
        await props.navigate(NARRATION_ROUTE);
        await narration.jump(TAKE_KEY_LABEL_KEY, props);
    },
    {
        name: "take_product",
        icon: (activity, props) => {
            return (
                <NavigationButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props);
                    }}
                    ariaLabel={props.uiTransition(activity.name)}
                >
                    <Package className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
                </NavigationButton>
            );
        },
    },
);

RegisteredActivities.add([bed, orderProduct, takeProduct]);
