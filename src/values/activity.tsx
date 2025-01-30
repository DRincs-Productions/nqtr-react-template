import { timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import BedIcon from "@mui/icons-material/Bed";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { NARRATION_ROUTE } from "../constans";
import { napLabel, sleepLabel } from "../labels/sleepNapLabels";
import { orderProductLabel, takeKeyLabel } from "../labels/variousActionsLabels";
import Activity from "../models/nqtr/Activity";

export const nap = new Activity(
    "nap",
    (_, event) => {
        event.navigate(NARRATION_ROUTE);
        if (timeTracker.nowIsBetween(5, 23)) {
            narration.jumpLabel(napLabel, event);
        } else {
            narration.jumpLabel(sleepLabel, event);
        }
    },
    {
        name: "Nap",
        icon: (activity, props) => {
            return (
                <NavigationRoundIconButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props);
                    }}
                    ariaLabel={activity.name}
                >
                    <BedIcon
                        sx={{
                            fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                        }}
                    />
                </NavigationRoundIconButton>
            );
        },
    }
);

export const orderProduct = new Activity(
    "order_product",
    (_, event) => {
        event.navigate(NARRATION_ROUTE);
        narration.jumpLabel(orderProductLabel, event);
    },
    {
        name: "Order product",
        icon: (activity, props) => {
            return (
                <NavigationRoundIconButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props);
                    }}
                    ariaLabel={activity.name}
                >
                    <ShoppingCartIcon
                        sx={{
                            fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                        }}
                    />
                </NavigationRoundIconButton>
            );
        },
    }
);

export const takeProduct = new Activity(
    "take_product",
    (_, event) => {
        event.navigate(NARRATION_ROUTE);
        narration.jumpLabel(takeKeyLabel, event);
    },
    {
        name: "Take product",
        icon: (activity, props) => {
            return (
                <NavigationRoundIconButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props);
                    }}
                    ariaLabel={activity.name}
                >
                    <InventoryIcon
                        sx={{
                            fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                        }}
                    />
                </NavigationRoundIconButton>
            );
        },
    }
);
