import { clearAllGameDatas, getFlag, narration } from "@drincs/pixi-vn";
import StepLabelProps from "@drincs/pixi-vn/dist/override/StepLabelProps";
import { startLabel } from "../labels/startLabel";

export async function goBack(navigate: (path: string) => void) {
    await narration.goBack(navigate)
}

export function gameEnd(props: StepLabelProps) {
    let isTheEnd = getFlag("is_the_end")
    if (isTheEnd) {
        clearAllGameDatas()
        props.navigate('/')
    }
    else {
        narration.jumpLabel(startLabel, props)
    }
}
