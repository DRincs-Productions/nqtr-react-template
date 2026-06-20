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
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryActivity, useQueryCommitment } from "@/lib/query/activity-query";
import { useQueryCurrentRoomId, useQueryRoom } from "@/lib/query/room-query";
import { cn } from "@/lib/utils";
import type TimeSlotsImage from "@/models/TimeSlotsImage";
import type { OnRunProps } from "@drincs/nqtr";
import type { CharacterInterface } from "@drincs/pixi-vn";
import { isValidElement, type ComponentProps, type CSSProperties, type ReactElement } from "react";

export function Activities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { room: { activities = [], routine = [] } = {} } = data || {};

    return (
        <ScrollArea className="h-full">
            <div className="flex min-h-full flex-col-reverse items-end gap-0.5">
                {routine.map((item) => (
                    <CommitmentButton key={`commitment-${item.id}`} id={item.id} />
                ))}
                {activities.map((item) => (
                    <ActivityButton key={`activity-${item.id}`} id={item.id} />
                ))}
            </div>
        </ScrollArea>
    );
}

function ActivityButton({ id }: { id: string }) {
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;
    const { data: activity } = useQueryActivity(id);

    if (!activity) return null;

    return (
        <ActivityBaseButton
            disabled={activity.disabled}
            onClick={() => activity.run(gameProps)}
            ariaLabel={t(activity.name)}
            image={activity.icon}
        />
    );
}

function CommitmentButton({ id }: { id: string }) {
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;
    const { data: commitment } = useQueryCommitment(id);

    if (!commitment) return null;

    return (
        <ActivityBaseButton
            disabled={commitment.disabled}
            onClick={() => commitment.run(gameProps)}
            ariaLabel={t(commitment.name)}
            image={commitment.icon}
            characters={commitment.characters}
        />
    );
}

const BORDER_RADIUS_SCALE = 1.2;
export function ActivityBaseButton({
    ariaLabel,
    image: imageProp,
    characters,
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
    characters?: CharacterInterface[];
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
            variant={"secondary"}
            className={cn(
                "relative size-10 overflow-hidden shadow-lg sm:size-14 md:size-20",
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
        </Button>
    );

    return (
        <Tooltip>
            <TooltipTrigger render={<span />}>{trigger}</TooltipTrigger>
            <TooltipContent>{ariaLabel}</TooltipContent>
        </Tooltip>
    );
}
