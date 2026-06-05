import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useSetSearchParamState } from "@/lib/hooks/navigation-hooks";
import { CURRENT_MAP_USE_QUERY_KEY } from "@/lib/query/map-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { Memo } from "@/lib/stores/memo-store";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "@tanstack/react-store";
import { MapIcon, NotebookPen, Settings } from "lucide-react";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";

export function ToolsLeft() {
    const setOpenSettings = useSetSearchParamState<boolean>("settings");
    const { t } = useTranslation(["ui"]);

    return (
        <ScrollArea>
            <div className="flex flex-row items-end justify-center gap-0.5">
                <ToolButton ariaLabel={t("settings")} onClick={() => setOpenSettings(true)}>
                    <Settings className="size-6 sm:size-8 md:size-10" />
                </ToolButton>
                <ToolButton ariaLabel={t("memo")} onClick={Memo.toggleOpen}>
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
                        navigate({ to: "/game/navigation" });
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
                    title={ariaLabel}
                    aria-label={ariaLabel}
                    size="icon-lg"
                    className={cn(
                        "relative size-10 overflow-hidden border-3 border-background shadow-lg sm:size-14 md:size-20",
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
