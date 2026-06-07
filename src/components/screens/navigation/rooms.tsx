import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import {
    CURRENT_ROOM_ID_USE_QUERY_KEY,
    useQueryCurrentRoomId,
    useQueryQuickRooms,
    useQueryRoom,
} from "@/lib/query/room-query";
import { cn } from "@/lib/utils";
import type TimeSlotsImage from "@/models/TimeSlotsImage";
import { navigator } from "@drincs/nqtr";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, type ComponentProps, type CSSProperties } from "react";

export function Rooms() {
    const { data: rooms = [] } = useQueryQuickRooms();

    return (
        <ScrollArea className="w-full">
            <div className="flex flex-row items-end justify-start gap-0.5">
                {rooms.map((room) => (
                    <RoomButton key={`room-${room.id}`} roomId={room.id} {...room} />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

function RoomButton({ roomId }: { roomId: string }) {
    const queryClient = useQueryClient();
    const { data } = useQueryRoom(roomId);
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { room, icon } = data || {};
    const { disabled, name, characters } = room || {};
    const selected = useMemo(() => currentRoomId === roomId, [currentRoomId, roomId]);

    return (
        <RoomNavButton
            disabled={disabled || selected}
            selected={selected}
            onClick={() => {
                if (!disabled && !selected) {
                    navigator.currentRoom = roomId;
                    queryClient.setQueryData(
                        [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_ROOM_ID_USE_QUERY_KEY],
                        roomId,
                    );
                }
            }}
            ariaLabel={name || ""}
            image={icon}
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
        </RoomNavButton>
    );
}

const BORDER_RADIUS_SCALE = 1.2;
export function RoomNavButton({
    ariaLabel,
    selected,
    image,
    circumference,
    className,
    disabled,
    style,
    children,
    ...rest
}: ComponentProps<typeof Button> & {
    ariaLabel: string;
    selected?: boolean;
    image?: string | TimeSlotsImage;
    circumference?: CSSProperties["width"];
}) {
    const trigger = (
        <Button
            {...rest}
            disabled={disabled}
            title={ariaLabel}
            aria-label={ariaLabel}
            size="icon-lg"
            className={cn(
                "relative size-10 overflow-hidden border-3 shadow-lg sm:size-14 md:size-20",
                selected ? "border-primary" : "border-background",
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
