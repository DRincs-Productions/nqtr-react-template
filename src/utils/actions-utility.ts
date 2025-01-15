import { clearAllGameDatas, getFlag, narration, StepLabelPropsType } from "@drincs/pixi-vn";
import { startLabel } from "../labels/startLabel";

export async function goBack(navigate: (path: string) => void) {
    await narration.goBack(navigate)
}

export function gameEnd(props: StepLabelPropsType) {
    let isTheEnd = getFlag("is_the_end")
    if (isTheEnd) {
        clearAllGameDatas()
        props.navigate('/')
    }
    else {
        narration.jumpLabel(startLabel, props)
    }
}
