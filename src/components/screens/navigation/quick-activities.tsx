import { ScrollArea } from "@/components/ui/scroll-area";
import { useActivitiesHotkey } from "@/lib/hooks/hotkeys-hooks";
import { useQueryCurrentRoomId, useQueryRoom } from "@/lib/query/room-query";
import { ActivityButton, CommitmentButton } from "./activity-buttons";

export function Activities() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    const { data } = useQueryRoom(currentRoomId);
    const { room: { activities = [], routine = [] } = {} } = data || {};
    const { containerRef } = useActivitiesHotkey();

    return (
        <ScrollArea className="h-full">
            <div ref={containerRef} className="flex min-h-full flex-col-reverse items-end gap-0.5">
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
