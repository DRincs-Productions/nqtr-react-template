import { Button } from "@/components/ui/button";
import { overlayTextShadowClass } from "@/constants";
import useTimeTracker from "@/lib/hooks/nqtr-hooks";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryTime } from "@/lib/query/time-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { cn } from "@/lib/utils";
import { useSelector } from "@tanstack/react-store";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Time() {
    const { t } = useTranslation(["ui"]);
    const { wait } = useTimeTracker();
    const { data: { hourFormatted = "...", dayName } = {} } = useQueryTime();
    const gameProps = useGameProps();
    const disabled = useSelector(GameStatus.store, (state) => state.loading);

    return (
        <div className="flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex flex-row items-center justify-center">
                <span
                    className={cn(
                        "text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
                        overlayTextShadowClass,
                    )}
                >
                    {hourFormatted}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("wait")}
                    className="mt-2 bg-black/50 border-0 text-white hover:bg-black/70 hover:text-white"
                    onClick={() => {
                        wait(1);
                        gameProps.invalidateInterfaceData();
                    }}
                    disabled={disabled}
                >
                    <Clock className="size-5 sm:size-5 md:size-5 lg:size-6 xl:size-7" />
                </Button>
            </div>
            <span
                className={cn(
                    "text-white text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl",
                    overlayTextShadowClass,
                )}
            >
                {dayName}
            </span>
        </div>
    );
}
