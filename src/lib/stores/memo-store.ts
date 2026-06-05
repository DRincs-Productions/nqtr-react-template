import { Store } from "@tanstack/store";

export namespace Memo {
    export const store = new Store<{ open: boolean; selectedQuestId: string | undefined }>({
        open: false,
        selectedQuestId: undefined,
    });

    export function toggleOpen() {
        store.setState((state) => ({ ...state, open: !state.open }));
    }

    export function setOpen(value: boolean) {
        store.setState((state) => ({ ...state, open: value }));
    }

    export function setSelectedQuestId(id: string | undefined) {
        store.setState((state) => ({ ...state, selectedQuestId: id }));
    }
}
