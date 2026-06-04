import NavigationButton from "@/components/screens/navigation/buttons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentRoomId, useQueryRoom } from "@/lib/query/room-query";

export function Activities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { activities = [], routine = [] } = data?.room || {};
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;

    return (
        <ScrollArea className="absolute bottom-0 right-0 max-h-[80%] pointer-events-auto">
            <div className="flex flex-col items-end justify-center gap-0.5">
                {activities.map((item) => (
                    <NavigationButton
                        key={`activity-${item.id}`}
                        disabled={item.disabled}
                        onClick={() => item.run(gameProps)}
                        ariaLabel={t(item.name)}
                        image={item.icon}
                    />
                ))}
                {routine.map((item) => (
                    <NavigationButton
                        key={`commitment-${item.id}`}
                        disabled={item.disabled}
                        onClick={() => item.run(gameProps)}
                        ariaLabel={t(item.name)}
                        image={item.icon}
                    />
                ))}
            </div>
        </ScrollArea>
    );
}
