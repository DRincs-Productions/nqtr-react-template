import { Store } from "@tanstack/store";

export namespace SelectedQuest {
    export const store = new Store<{ id: string | undefined }>({ id: undefined });

    export function setId(id: string | undefined) {
        store.setState((state) => ({ ...state, id }));
    }
}
