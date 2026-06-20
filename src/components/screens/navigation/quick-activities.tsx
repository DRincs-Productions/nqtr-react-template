import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentRoomId, useQueryRoom } from "@/lib/query/room-query";
import { useQueryTime } from "@/lib/query/time-query";
import { cn } from "@/lib/utils";
import type TimeSlotsImage from "@/models/TimeSlotsImage";
import type { OnRunProps } from "@drincs/nqtr";
import {
    RegisteredActivities,
    RegisteredCommitments,
    type CommitmentInterface,
} from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";
import { isValidElement, type ComponentProps, type CSSProperties, type ReactElement } from "react";

const ACTIVITY_QUERY_KEY = "activity_query_key";

export function Activities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { room: { activities = [], routine = [] } = {} } = data || {};

    return (
        <ScrollArea className="h-full">
            <div className="flex min-h-full flex-col-reverse items-end gap-0.5">
                {routine.map((item) => (
                    <ActivityButton key={`commitment-${item.id}`} activityId={item.id} />
                ))}
                {activities.map((item) => (
                    <ActivityButton key={`activity-${item.id}`} activityId={item.id} />
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
        queryFn: () =>
            RegisteredActivities.get(activityId) ?? RegisteredCommitments.get(activityId),
    });

    if (!activity) return null;

    const characters =
        "characters" in activity ? (activity as CommitmentInterface).characters : undefined;

    return (
        <ActivityNavButton
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
        </ActivityNavButton>
    );
}

const BORDER_RADIUS_SCALE = 1.2;
export function ActivityNavButton({
    ariaLabel,
    image: imageProp,
    circumference,
    className,
    disabled,
    style,
    children,
    ...rest
}: ComponentProps<typeof Button> & {
    ariaLabel: string;
    image?: string | TimeSlotsImage | ReactElement | ((props: OnRunProps) => ReactElement);
    circumference?: CSSProperties["width"];
}) {
    const gameProps = useGameProps();

    let image = imageProp;
    if (typeof image === "function") {
        image = image(gameProps);
    }

    if (isValidElement(image)) {
        return image;
    }

    const trigger = (
        <Button
            {...rest}
            disabled={disabled}
            size="icon-lg"
            className={cn(
                "relative size-10 overflow-hidden border-3 border-background shadow-lg sm:size-14 md:size-20",
                className,
            )}
            style={{
                borderRadius: `calc(var(--radius-lg) * ${BORDER_RADIUS_SCALE})`,
                ...(circumference ? { width: circumference, height: circumference } : undefined),
                ...style,
            }}
        >
            {image && (
                <Image
                    src={image}
                    alt={ariaLabel}
                    layout="constrained"
                    width={128}
                    height={128}
                    className="absolute inset-0 size-full object-cover"
                />
            )}
            {children}
        </Button>
    );

    return (
        <Tooltip>
            <TooltipTrigger render={<span />}>{trigger}</TooltipTrigger>
            <TooltipContent>{ariaLabel}</TooltipContent>
        </Tooltip>
    );
}
