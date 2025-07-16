import { OnRunAsyncFunction } from "@drincs/nqtr";
import { useMemo } from "react";
import { NqtrRoundIconButtonConvertor } from "../../components/NqtrRoundIconButton.tsx";
import StackOverflow from "../../components/StackOverflow.tsx";
import useGameProps from "../../hooks/useGameProps.ts";
import { useQueryCurrentRoomId, useQueryRoom } from "../../hooks/useQueryNQTR";

export default function QuickActivities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data: { activities = [], routine = [] } = {} } = useQueryRoom(currentRoomId);
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
            maxLeght={"80%"}
            sx={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                right: 0,
                pointerEvents: "auto",
            }}
        >
            {activities.map((item, index) => (
                <NqtrRoundIconButtonConvertor
                    key={`activity-${index}-${item.id}`}
                    disabled={item.disabled}
                    onClick={() => onClick(item.run)}
                    ariaLabel={t(item.name)}
                    image={item.icon}
                />
            ))}
            {routine.map((item, index) => (
                <NqtrRoundIconButtonConvertor
                    key={`commitment-${index}-${item.id}`}
                    disabled={item.disabled}
                    onClick={() => onClick(item.run)}
                    ariaLabel={t(item.name)}
                    image={item.icon}
                />
            ))}
        </StackOverflow>
    );
}
