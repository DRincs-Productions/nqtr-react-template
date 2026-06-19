import MapScreen from "@/components/screens/map";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/map")({
    component: MapScreen,
});
