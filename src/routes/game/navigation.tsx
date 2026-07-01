import { NavigationScreen } from "@/components/screens/navigation";
import { useNavigationHotkeys } from "@/lib/hooks/hotkeys-hooks";
import { useRoomLayerSync } from "@/lib/hooks/nqtr-hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/navigation")({
    component: RouteComponent,
});

function RouteComponent() {
    useRoomLayerSync();
    useNavigationHotkeys();

    return <NavigationScreen />;
}
