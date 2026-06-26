import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useQueryTime } from "@/lib/query/time-query";
import { RegisteredActivities, RegisteredCommitments } from "@drincs/nqtr";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const ACTIVITY_USE_QUERY_KEY = "activity_use_query_key";
export function useQueryActivity(activityId: string) {
    const { data: { day, hour } = {} } = useQueryTime();
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, ACTIVITY_USE_QUERY_KEY, activityId, day, hour],
        queryFn: () => RegisteredActivities.get(activityId),
        placeholderData: keepPreviousData,
    });
}

const COMMITMENT_USE_QUERY_KEY = "commitment_use_query_key";
export function useQueryCommitment(activityId: string) {
    const { data: { day, hour } = {} } = useQueryTime();
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, COMMITMENT_USE_QUERY_KEY, activityId, day, hour],
        queryFn: () => RegisteredCommitments.get(activityId),
        placeholderData: keepPreviousData,
    });
}
