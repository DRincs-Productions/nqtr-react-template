import { AnimatePresence } from "motion/react";
import { NavigationRoundIconButtonConvertor } from "../../components/NavigationRoundIconButton";
import StackOverflow from "../../components/StackOverflow.tsx";
import useGameProps from "../../hooks/useGameProps.tsx";
import { useQueryCurrentRoom } from "../../use_query/useQueryNQTR";

export default function QuickActivities() {
    const { data: { activities = [], routine = [] } = {} } = useQueryCurrentRoom();
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;

    return (
        <StackOverflow
            direction='column'
            justifyContent='center'
            alignItems='flex-end'
            spacing={0.5}
            maxLeght={"100%"}
            sx={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                right: 0,
                pointerEvents: "auto",
            }}
        >
            <AnimatePresence>
                {activities.map((item) => (
                    <NavigationRoundIconButtonConvertor
                        key={"activity" + item.id}
                        disabled={item.disabled}
                        onClick={() => {
                            item.run(gameProps);
                        }}
                        ariaLabel={t(item.name)}
                        image={item.icon}
                    />
                ))}
                {routine.map((item) => (
                    <NavigationRoundIconButtonConvertor
                        key={"commitment" + item.id}
                        disabled={item.disabled}
                        onClick={() => {
                            item.run(gameProps);
                        }}
                        ariaLabel={t(item.name)}
                        image={item.icon}
                    />
                ))}
            </AnimatePresence>
        </StackOverflow>
    );
}
