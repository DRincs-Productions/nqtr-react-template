import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { timeTracker } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const CURRENT_HOUR_USE_QUERY_KEY = "current_hour_use_query_key";
export function useQueryTime() {
    const { t } = useTranslation(["ui"]);

    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_HOUR_USE_QUERY_KEY],
        queryFn: async () => {
            const hour = timeTracker.currentTime;
            return {
                hour,
                day: timeTracker.currentDate,
                hourFormatted: hour > 9 ? `${hour}:00` : `0${hour}:00`,
                dayName: t(timeTracker.currentDayName ?? ""),
            };
        },
    });
}
