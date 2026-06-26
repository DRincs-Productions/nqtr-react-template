import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useSetSearchParamState } from "@/lib/hooks/navigation-hooks";
import { CURRENT_MAP_USE_QUERY_KEY } from "@/lib/query/map-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "@tanstack/react-store";
import { MapIcon, NotebookPen, Save, Settings } from "lucide-react";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";

export function ToolsLeft() {
    const setOpenSettings = useSetSearchParamState<boolean>("settings");
    const setOpenMemo = useSetSearchParamState<boolean>("memo");
    const setSettingsTab = useSetSearchParamState<string>("settings_tab");
    const { t } = useTranslation(["ui"]);

    return (
        <ScrollArea>
            <div className="flex flex-row items-end justify-center gap-0.5">
                <ToolButton ariaLabel={t("settings")} onClick={() => setOpenSettings(true)}>
                    <Settings className="size-6 sm:size-8 md:size-10" />
                </ToolButton>
                <ToolButton
                    ariaLabel={`${t("save")}/${t("load")}`}
                    onClick={() => {
                        setOpenSettings(true);
                        setSettingsTab("menus/save-load");
                    }}
                >
                    <Save className="size-6 sm:size-8 md:size-10" />
                </ToolButton>
                <ToolButton
                    ariaLabel={t("memo")}
                    onClick={() => setOpenMemo((prev) => !prev || undefined)}
                >
                    <NotebookPen className="size-6 sm:size-8 md:size-10" />
                </ToolButton>
            </div>
        </ScrollArea>
    );
}

export function ToolsRight() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { t } = useTranslation(["ui"]);

    return (
        <ScrollArea>
            <div className="flex flex-row items-end justify-center gap-0.5">
                <ToolButton
                    ariaLabel={t("map")}
                    onClick={() => {
                        queryClient.invalidateQueries({
                            queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
                        });
                        navigate({ to: "/game/map" });
                    }}
                >
                    <MapIcon className="size-6 sm:size-8 md:size-10" />
                </ToolButton>
            </div>
        </ScrollArea>
    );
}

const BORDER_RADIUS_SCALE = 1.2;
export function ToolButton({
    ariaLabel,
    className,
    disabled,
    children,
    ...rest
}: ComponentProps<typeof Button> & {
    ariaLabel: string;
}) {
    const loading = useSelector(GameStatus.store, (state) => state.loading);

    return (
        <Tooltip>
            <TooltipTrigger render={<span />}>
                <Button
                    {...rest}
                    disabled={disabled ?? loading}
                    size="icon-lg"
                    variant={"secondary"}
                    className={cn(
                        "relative size-9 overflow-hidden shadow-lg sm:size-12 md:size-16",
                        className,
                    )}
                    style={{ borderRadius: `calc(var(--radius-lg) * ${BORDER_RADIUS_SCALE})` }}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent>{ariaLabel}</TooltipContent>
        </Tooltip>
    );
}
