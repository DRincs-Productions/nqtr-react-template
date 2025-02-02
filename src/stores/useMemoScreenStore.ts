import { questsNotebook } from "@drincs/nqtr";
import { create } from "zustand";

type MemoScreenStoreType = {
    /**
     * Whether the screen is open
     */
    open: boolean;
    /**
     * Open the screen
     */
    editOpen: () => void;
    /**
     * Set the open state of the screen
     */
    setOpen: (value: boolean) => void;
    /**
     * List of started quests
     */
    startedQuests: QuestDescription[];
    /**
     * List of completed quests
     */
    completedQuests: QuestDescription[];
    /**
     * Update the started quests list
     */
    selectedQuest?: QuestDescription;
    /**
     * Set the selected quest
     */
    setSelectedQuest: (quest: QuestDescription) => void;
};

type QuestDescription = {
    id: string;
    name: string;
    description: string;
    currentStage: {
        description: string;
    };
    questImage?: string;
    completed?: boolean;
    isInDevelopment?: boolean;
};

function getStartedQuests() {
    let quests: QuestDescription[] = questsNotebook.startedQuests.map((quest) => {
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
            questImage: quest.image?.src,
            completed: quest.completed,
            isInDevelopment: quest.inDevelopment,
        };
    });
    return quests.filter((quest) => {
        return !quest.completed;
    });
}

function getCompletedQuests() {
    let quests: QuestDescription[] = questsNotebook.startedQuests.map((quest) => {
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
            questImage: quest.image?.src,
            completed: quest.completed,
            isInDevelopment: quest.inDevelopment,
        };
    });
    return quests.filter((quest) => {
        return quest.completed;
    });
}

const useMemoScreenStore = create<MemoScreenStoreType>((set) => ({
    open: false,
    editOpen: () =>
        set((state) => {
            let s: Partial<MemoScreenStoreType> = {};
            if (!state.open) {
                s.startedQuests = getStartedQuests();
                s.completedQuests = getCompletedQuests();
            }
            return { open: !state.open, ...s };
        }),
    setOpen: (value: boolean) =>
        set((state) => {
            let s: Partial<MemoScreenStoreType> = {};
            if (!state.open) {
                s.startedQuests = getStartedQuests();
                s.completedQuests = getCompletedQuests();
            }
            return { open: value, ...s };
        }),
    startedQuests: [],
    completedQuests: [],
    updateStartedQuests: () => {
        set({ startedQuests: getStartedQuests(), completedQuests: getCompletedQuests() });
    },
    selectedQuest: undefined,
    setSelectedQuest: (quest: QuestDescription) => set({ selectedQuest: quest }),
}));
export default useMemoScreenStore;
