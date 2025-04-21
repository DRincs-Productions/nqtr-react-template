import { create } from "zustand";

type NQTRStoreType = {
    disable: boolean;
    setDisable: (value: boolean) => void;
};

const useNqtrScreenStore = create<NQTRStoreType>((set) => ({
    disable: false,
    setDisable: (value: boolean) => set({ disable: value }),
}));
export default useNqtrScreenStore;
