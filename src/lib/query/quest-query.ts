import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { SelectedQuest } from "@/lib/stores/selected-quest-store";
import { type QuestInterface, questsNotebook } from "@drincs/nqtr";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "@tanstack/react-store";

function getQuestInfo(quest: QuestInterface) {
    let currentStageDescription = "";
    if (quest.currentStage) {
        if (quest.completed) {
            if (quest.inDevelopment) {
                currentStageDescription = "quest_is_in_development";
            } else {
                currentStageDescription = "completed";
            }
        } else if (!quest.currentStage.started && quest.currentStage.requestDescriptionToStart) {
            currentStageDescription = quest.currentStage.requestDescriptionToStart;
        } else if (quest.currentStage.description) {
            currentStageDescription = quest.currentStage.description;
        }
    }

    return {
        id: quest.id,
        name: quest.name,
        description: quest.description,
        currentStage: {
            description: currentStageDescription,
        },
        questImage: quest.image,
        completed: quest.completed,
        isInDevelopment: quest.inDevelopment,
    };
}

const QUESTS_USE_QUERY_KEY = "quests_use_query_key";
export function useQueryQuests() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, QUESTS_USE_QUERY_KEY],
        queryFn: async () => {
            const inProgressQuests = questsNotebook.inProgressQuests.map(getQuestInfo);
            const completedQuests = questsNotebook.completedQuests.map(getQuestInfo);
            const failedQuests = questsNotebook.failedQuests.map(getQuestInfo);
            return {
                inProgressQuests,
                completedQuests,
                failedQuests,
            };
        },
    });
}

export const SELECTED_QUEST_USE_QUERY_KEY = "selected_quest_use_query_key";
export function useQuerySelectedQuest() {
    const selectedQuestId = useSelector(SelectedQuest.store, (state) => state.id);
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, SELECTED_QUEST_USE_QUERY_KEY, selectedQuestId],
        queryFn: async () => {
            const selectedQuest = selectedQuestId
                ? questsNotebook.find(selectedQuestId)
                : undefined;
            return selectedQuest ? getQuestInfo(selectedQuest) : null;
        },
    });
}
