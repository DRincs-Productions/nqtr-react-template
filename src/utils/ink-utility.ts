import { RegisteredQuests, RegisteredRooms } from "@drincs/nqtr";
import { RegisteredCharacters } from "@drincs/pixi-vn";
import { importInkText, onInkHashtagScript, onReplaceTextBeforeTranslation } from "@drincs/pixi-vn-ink";

export async function importAllInkLabels() {
    const files = import.meta.glob<string>("../ink/*.{ink,txt}", { as: "raw" });
    const fileEntries = await Promise.all(
        Object.values(files).map(async (importFile) => {
            return await importFile();
        })
    );
    await importInkText(fileEntries);
}

export function initializeInk() {
    onInkHashtagScript((script, props, convertListStringToObj) => {
        if (script.length === 2) {
            if (script[0] === "navigate") {
                props.navigate(script[1]);
                return true;
            }
        }
        if (script[0] === "rename" && script.length === 3) {
            let character = RegisteredCharacters.get(script[1]);
            if (character) {
                character.name = script[2];
            }
            return true;
        }
        if (script[1] === "activity") {
            if (script[0] === "remove" && script[3] === "room" && script.length >= 5) {
                let room = RegisteredRooms.get(script[4]);
                if (room) {
                    const props = convertListStringToObj(script.slice(5));
                    room.removeActivity(script[2], props);
                }
            }
        }
        if (script[1] === "queststage") {
            if (script[0] === "complete" && script.length === 3) {
                let quest = RegisteredQuests.get(script[2]);
                if (quest) {
                    quest.completeCurrentStageAndGoNext(props);
                }
            }
        }
        return false;
    });
    onReplaceTextBeforeTranslation((key) => {
        return `{{${key}}}`;
    });
}
