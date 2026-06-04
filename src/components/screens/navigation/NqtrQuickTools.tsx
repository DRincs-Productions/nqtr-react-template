import { ScrollArea } from "@/components/ui/scroll-area";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useSetSearchParamState } from "@/lib/hooks/navigation-hooks";
import { CURRENT_MAP_USE_QUERY_KEY } from "@/lib/query/map-query";
import { MemoScreen } from "@/lib/stores/memo-screen-store";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MapIcon, NotebookPen, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import NavigationButton from "./buttons";

export function NqtrQuickTools() {
    const setOpenSettings = useSetSearchParamState<boolean>("settings");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { t } = useTranslation(["ui"]);

    return (
        <>
            <ScrollArea className="absolute top-0 left-0 pointer-events-auto">
                <div className="flex flex-row items-end justify-center gap-0.5">
                    <NavigationButton ariaLabel={t("settings")} onClick={() => setOpenSettings(true)}>
                        <Settings className="size-6 sm:size-8 md:size-10" />
                    </NavigationButton>
                    <NavigationButton ariaLabel={t("memo")} onClick={MemoScreen.toggleOpen}>
                        <NotebookPen className="size-6 sm:size-8 md:size-10" />
                    </NavigationButton>
                </div>
            </ScrollArea>
            <ScrollArea className="absolute top-0 right-0 pointer-events-auto">
                <div className="flex flex-row items-end justify-center gap-0.5">
                    <NavigationButton
                        ariaLabel={t("map")}
                        onClick={() => {
                            queryClient.invalidateQueries({
                                queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                            });
                            navigate({ to: "/game/navigation" });
                        }}
                    >
                        <MapIcon className="size-6 sm:size-8 md:size-10" />
                    </NavigationButton>
                </div>
            </ScrollArea>
        </>
    );
}
