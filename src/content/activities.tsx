import NavigationButton from "@/components/scrrens/navigation/buttons";
import { napLabel, sleepLabel } from "@/content/labels/sleep.label";
import { orderProductLabel, takeKeyLabel } from "@/content/labels/various.label";
import Activity from "@/models/nqtr/Activity";
import { RegisteredActivities, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import { Bed, Package, ShoppingCart } from "lucide-react";

export const bed = new Activity(
    "bed",
    async (_, props) => {
        await props.navigate({ to: "/game/navigation" });
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
        await props.navigate({ to: "/game/navigation" });
        await narration.jump(orderProductLabel, props);
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
        await props.navigate({ to: "/game/navigation" });
        await narration.jump(takeKeyLabel, props);
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
