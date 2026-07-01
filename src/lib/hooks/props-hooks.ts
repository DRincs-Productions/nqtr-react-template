import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import type { StepLabelProps } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useTimeTracker from "./useTimeTracker";

export function useGameProps(): StepLabelProps {
    const navigate = useNavigate();
    const { t } = useTranslation(["narration"]);
    const { t: uiTransition } = useTranslation(["ui"]);
    const queryClient = useQueryClient();
    const { sleep, wait } = useTimeTracker();

    return {
        navigate,
        t,
        uiTransition,
        toast,
        invalidateInterfaceData: async (delay: number = 0) => {
            if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
            return await queryClient.invalidateQueries({
                queryKey: [INTERFACE_DATA_USE_QUERY_KEY],
            });
        },
        sleep,
        wait,
    };
}
