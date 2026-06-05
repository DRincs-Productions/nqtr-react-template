import { QuickTools } from "@/components/quick-tools";
import { Activities } from "@/components/screens/navigation/activities";
import { Rooms } from "@/components/screens/navigation/rooms";
import { Tools } from "@/components/screens/navigation/tools";

export function NavigationScreen() {
    return (
        <>
            <Activities />
            <Rooms />
            <Tools />
            <QuickTools />
        </>
    );
}
