import { create } from "zustand";
import { QuestDescription } from "../use_query/useQueryNQTR";

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
     * Update the started quests list
     */
    selectedQuest?: QuestDescription;
};

const useMemoScreenStore = create<MemoScreenStoreType>((set) => ({
    open: false,
    editOpen: () => set((state) => ({ open: !state.open })),
    setOpen: (value: boolean) => set({ open: value }),
    startedQuests: [],
    completedQuests: [],
    selectedQuest: undefined,
    setSelectedQuest: (quest: QuestDescription) => set({ selectedQuest: quest }),
}));
export default useMemoScreenStore;
