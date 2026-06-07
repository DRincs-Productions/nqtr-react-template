import { Activities } from "@/components/screens/navigation/activities";
import { Rooms } from "@/components/screens/navigation/rooms";
import { Time } from "@/components/screens/navigation/time";
import { ToolsLeft, ToolsRight } from "@/components/screens/navigation/tools";

export function NavigationScreen() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Top-left tools */}
            <div className="absolute top-0 left-0">
                <ToolsLeft />
            </div>

            {/* Top-center time */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <Time />
            </div>

            {/* Top-right tools */}
            <div className="absolute top-0 right-0">
                <ToolsRight />
            </div>

            {/* Bottom row: Rooms left, Activities right — Rooms shrinks to avoid overlapping Activities */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-row items-end">
                <div className="flex-1 min-w-0 overflow-hidden">
                    <Rooms />
                </div>
                <div className="flex-none">
                    <Activities />
                </div>
            </div>
        </div>
    );
}
