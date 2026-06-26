import { NavigationScreen } from "@/components/screens/navigation";
import { useRoomLayerSync } from "@/lib/hooks/nqtr-hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/navigation")({
    component: RouteComponent,
});

function RouteComponent() {
    useRoomLayerSync();

    return <NavigationScreen />;
}
