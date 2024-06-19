import { newActivity, TimeManager } from "@drincs/nqtr";
import { GameStepManager } from "@drincs/pixi-vn";
import BedIcon from '@mui/icons-material/Bed';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { napLabel, sleepLabel } from "../labels/sleepNapLabels";
import { orderProductLabel, takeKeyLabel } from "../labels/variousActionsLabels";

export const nap = newActivity("nap",
    (_, event) => {
        event.navigate("/game")
        if (TimeManager.nowIsBetween(5, 23)) {
            GameStepManager.jumpLabel(napLabel, event)
        }
        else {
            GameStepManager.jumpLabel(sleepLabel, event)
        }
    },
    {
        name: "Nap",
        renderIcon: (activity, props) => {
            return <NavigationRoundIconButton
                disabled={activity.disabled}
                onClick={() => {
                    activity.run(props)
                }}
                ariaLabel={activity.name}
            >
                <BedIcon
                    sx={{
                        fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                    }}
                />
            </NavigationRoundIconButton>
        },
    }
)

export const orderProduct = newActivity("order_product",
    (_, event) => {
        event.navigate("/game")
        GameStepManager.jumpLabel(orderProductLabel, event)
    },
    {
        name: "Order product",
        renderIcon: (activity, props) => {
            return <NavigationRoundIconButton
                disabled={activity.disabled}
                onClick={() => {
                    activity.run(props)
                }}
                ariaLabel={activity.name}
            >
                <ShoppingCartIcon
                    sx={{
                        fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                    }}
                />
            </NavigationRoundIconButton>
        },
    }
)

export const takeProduct = newActivity("take_product",
    (_, event) => {
        event.navigate("/game")
        GameStepManager.jumpLabel(takeKeyLabel, event)
    },
    {
        name: "Take product",
        renderIcon: (activity, props) => {
            return <NavigationRoundIconButton
                disabled={activity.disabled}
                onClick={() => {
                    activity.run(props)
                }}
                ariaLabel={activity.name}
            >
                <ShoppingCartIcon
                    sx={{
                        fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                    }}
                />
            </NavigationRoundIconButton>
        },
    }
)
