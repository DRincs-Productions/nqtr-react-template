import { create } from "zustand";

type NQTRStoreType = {
    disabled: boolean;
    setDisabled: (value: boolean) => void;
};

const useNqtrScreenStore = create<NQTRStoreType>((set) => ({
    disabled: false,
    setDisabled: (value: boolean) => set({ disabled: value }),
}));
export default useNqtrScreenStore;
