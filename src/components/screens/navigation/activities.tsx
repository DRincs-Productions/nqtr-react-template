import NavigationButton from "@/components/screens/navigation/buttons";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentRoomId, useQueryRoom } from "@/lib/query/room-query";
import { useQueryTime } from "@/lib/query/time-query";
import { RegisteredActivities, RegisteredCommitments, type CommitmentInterface } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";

const ACTIVITY_QUERY_KEY = "activity_query_key";

export function Activities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { room } = data || {};

    return (
        <ScrollArea className="absolute bottom-0 right-0 max-h-[80%] pointer-events-auto">
            <div className="flex flex-col items-end justify-center gap-0.5">
                {(room?.activities ?? []).map((item) => (
                    <ActivityButton key={`activity-${item.id}`} activityId={item.id} />
                ))}
                {(room?.routine ?? []).map((item) => (
                    <ActivityButton key={`commitment-${item.id}`} activityId={item.id} />
                ))}
            </div>
        </ScrollArea>
    );
}

function ActivityButton({ activityId }: { activityId: string }) {
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;
    const { data: { day, hour } = {} } = useQueryTime();

    const { data: activity } = useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, ACTIVITY_QUERY_KEY, activityId, day, hour],
        queryFn: () => RegisteredActivities.get(activityId) ?? RegisteredCommitments.get(activityId),
    });

    if (!activity) return null;

    const characters = "characters" in activity ? (activity as CommitmentInterface).characters : undefined;

    return (
        <NavigationButton
            disabled={activity.disabled}
            onClick={() => activity.run(gameProps)}
            ariaLabel={t(activity.name)}
            image={activity.icon}
        >
            {characters && (
                <AvatarGroup className="absolute right-0 bottom-0">
                    {characters.length <= 3 &&
                        characters.map((character) => (
                            <Avatar key={character.id} size="sm">
                                <AvatarImage src={character.icon} alt={character.name} />
                                <AvatarFallback>{character.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        ))}
                    {characters.length > 3 && (
                        <>
                            {characters.slice(0, 2).map((character) => (
                                <Avatar key={character.id} size="sm">
                                    <AvatarImage src={character.icon} alt={character.name} />
                                    <AvatarFallback>{character.name.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                            ))}
                            <AvatarGroupCount className="size-6 bg-black/50 text-white">
                                +{characters.length - 2}
                            </AvatarGroupCount>
                        </>
                    )}
                </AvatarGroup>
            )}
        </NavigationButton>
    );
}
