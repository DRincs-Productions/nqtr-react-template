import { Activities } from "@/components/screens/navigation/quick-activities";
import { Rooms } from "@/components/screens/navigation/quick-rooms";
import { Time } from "@/components/screens/navigation/time";
import { ToolsLeft, ToolsRight } from "@/components/screens/navigation/tools";

export function NavigationScreen() {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col">
            {/* Top row: tools and time */}
            <div className="flex-none relative flex flex-row items-start opacity-50 hover:opacity-100 transition-opacity">
                <ToolsLeft />
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Time />
                </div>
                <div className="flex-1" />
                <ToolsRight />
            </div>

            {/* Bottom area: fills remaining height — Rooms bottom-left, Activities bottom-right */}
            <div className="flex-1 min-h-0 flex flex-row">
                <div className="flex-1 min-w-0 overflow-hidden self-end opacity-80 hover:opacity-100 transition-opacity">
                    <Rooms />
                </div>
                <div className="flex-none self-stretch opacity-80 hover:opacity-100 transition-opacity">
                    <Activities />
                </div>
            </div>
        </div>
    );
}
