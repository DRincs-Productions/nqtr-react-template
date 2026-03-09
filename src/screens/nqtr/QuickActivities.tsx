import { NqtrRoundIconButtonConvertor } from "../../components/NqtrRoundIconButton.tsx";
import StackOverflow from "../../components/StackOverflow.tsx";
import useGameProps from "../../hooks/useGameProps.ts";
import { useQueryCurrentRoomId, useQueryRoom } from "../../hooks/useQueryNQTR";

export default function QuickActivities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { activities = [], routine = [] } = data?.room || {};
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;

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
                    onClick={() => item.run(gameProps)}
                    ariaLabel={t(item.name)}
                    image={item.icon}
                />
            ))}
            {routine.map((item, index) => (
                <NqtrRoundIconButtonConvertor
                    key={`commitment-${index}-${item.id}`}
                    disabled={item.disabled}
                    onClick={() => item.run(gameProps)}
                    ariaLabel={t(item.name)}
                    image={item.icon}
                />
            ))}
        </StackOverflow>
    );
}
