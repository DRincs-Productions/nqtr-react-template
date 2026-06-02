import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirect for old versions that used /navigation
export const Route = createFileRoute("/navigation")({
    beforeLoad: () => {
        throw redirect({ to: "/game/navigation" });
    },
    component: () => null,
});
