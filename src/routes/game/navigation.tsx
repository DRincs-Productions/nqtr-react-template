import { NavigationScreen } from "@/components/screens/navigation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/navigation")({
    component: RouteComponent,
});

function RouteComponent() {
    return <NavigationScreen />;
}
