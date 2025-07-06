import { RegisteredActivities, timeTracker } from "@drincs/nqtr";
import BedIcon from "@mui/icons-material/Bed";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NqtrRoundIconButton from "../components/NqtrRoundIconButton";
import { NARRATION_ROUTE } from "../constans";
import { napLabel, sleepLabel } from "../labels/sleepNapLabels";
import { navigateAndJumpToLabel } from "../labels/utility-labels";
import { ORDER_PRODUCT_LABEL_KEY, TAKE_KEY_LABEL_KEY } from "../labels/variousActionsLabelKeys";
import Activity from "../models/nqtr/Activity";

export const bed = new Activity(
    "bed",
    async (_, event) => {
        if (timeTracker.nowIsBetween(5, 22)) {
            await navigateAndJumpToLabel(napLabel, NARRATION_ROUTE, event);
        } else {
            await navigateAndJumpToLabel(sleepLabel, NARRATION_ROUTE, event);
        }
    },
    {
        name: "bed",
        icon: (activity, props) => {
            return (
                <NqtrRoundIconButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props).then(() => {
                            props.invalidateInterfaceData();
                        });
                    }}
                    ariaLabel={props.uiTransition(activity.name)}
                    variant='solid'
                    color='primary'
                >
                    <BedIcon
                        sx={{
                            fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                        }}
                    />
                </NqtrRoundIconButton>
            );
        },
    }
);

export const orderProduct = new Activity(
    "order_product",
    async (_, event) => await navigateAndJumpToLabel(ORDER_PRODUCT_LABEL_KEY, NARRATION_ROUTE, event),
    {
        name: "order_product",
        icon: (activity, props) => {
            return (
                <NqtrRoundIconButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props).then(() => {
                            props.invalidateInterfaceData();
                        });
                    }}
                    ariaLabel={props.uiTransition(activity.name)}
                    variant='solid'
                    color='primary'
                >
                    <ShoppingCartIcon
                        sx={{
                            fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                        }}
                    />
                </NqtrRoundIconButton>
            );
        },
    }
);

export const takeProduct = new Activity(
    "take_product",
    async (_, event) => await navigateAndJumpToLabel(TAKE_KEY_LABEL_KEY, NARRATION_ROUTE, event),
    {
        name: "take_product",
        icon: (activity, props) => {
            return (
                <NqtrRoundIconButton
                    disabled={activity.disabled}
                    onClick={() => {
                        activity.run(props).then(() => {
                            props.invalidateInterfaceData();
                        });
                    }}
                    ariaLabel={props.uiTransition(activity.name)}
                    variant='solid'
                    color='primary'
                >
                    <InventoryIcon
                        sx={{
                            fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                        }}
                    />
                </NqtrRoundIconButton>
            );
        },
    }
);

RegisteredActivities.add([bed, orderProduct, takeProduct]);
