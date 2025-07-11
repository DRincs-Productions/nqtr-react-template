import { OnRunAsyncFunction } from "@drincs/nqtr";
import { AnimatePresence } from "motion/react";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { NqtrRoundIconButtonConvertor } from "../../components/NqtrRoundIconButton.tsx";
import StackOverflow from "../../components/StackOverflow.tsx";
import useGameProps from "../../hooks/useGameProps.ts";
import { useQueryCurrentRoomId, useQueryRoom } from "../../hooks/useQueryNQTR";
import useInterfaceStore from "../../stores/useInterfaceStore.ts";

export default function QuickActivities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data: { activities = [], routine = [] } = {} } = useQueryRoom(currentRoomId);
    const hidden = useInterfaceStore(useShallow((state) => state.hidden));
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;
    const onClick = useMemo(
        () => async (run: OnRunAsyncFunction) => {
            run(gameProps).then(() => {
                gameProps.invalidateInterfaceData();
            });
        },
        [gameProps]
    );

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
            className={hidden ? `motion-opacity-out-0 motion-translate-x-out-[50%]` : undefined}
        >
            <AnimatePresence>
                {activities.map((item) => (
                    <NqtrRoundIconButtonConvertor
                        key={"activity" + item.id}
                        disabled={item.disabled}
                        onClick={() => onClick(item.run)}
                        ariaLabel={t(item.name)}
                        image={item.icon}
                    />
                ))}
                {routine.map((item) => (
                    <NqtrRoundIconButtonConvertor
                        key={"commitment" + item.id}
                        disabled={item.disabled}
                        onClick={() => onClick(item.run)}
                        ariaLabel={t(item.name)}
                        image={item.icon}
                    />
                ))}
            </AnimatePresence>
        </StackOverflow>
    );
}
