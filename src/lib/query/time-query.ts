import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { timeTracker } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";

const CURRENT_HOUR_USE_QUERY_KEY = "current_hour_use_query_key";
export function useQueryTime() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_HOUR_USE_QUERY_KEY],
        queryFn: async () => ({
            hour: timeTracker.currentTime,
            day: timeTracker.currentDate,
        }),
    });
}
