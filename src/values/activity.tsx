import { timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import BedIcon from "@mui/icons-material/Bed";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { napLabel, sleepLabel } from "../labels/sleepNapLabels";
import { orderProductLabel, takeKeyLabel } from "../labels/variousActionsLabels";
import Activity from "../models/nqtr/Activity";

export const nap = new Activity(
    "nap",
    (_, event) => {
        event.navigate("/game");
        if (timeTracker.nowIsBetween(5, 23)) {
            narration.jumpLabel(napLabel, event);
        } else {
            narration.jumpLabel(sleepLabel, event);
        }
    },
    {
        name: "Nap",
        icon: (
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
        ),
    }
);

export const orderProduct = new Activity(
    "order_product",
    (_, event) => {
        event.navigate("/game");
        narration.jumpLabel(orderProductLabel, event);
    },
    {
        name: "Order product",
        renderIcon: (activity, props) => {
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
        event.navigate("/game");
        narration.jumpLabel(takeKeyLabel, event);
    },
    {
        name: "Take product",
        renderIcon: (activity, props) => {
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
