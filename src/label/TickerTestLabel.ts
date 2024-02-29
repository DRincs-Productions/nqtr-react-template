import { Label } from "../lib/classes/Label";
import { CanvasSprite } from "../lib/classes/canvas/CanvasSprite";
import { RotateTicker } from "../lib/classes/ticker/RotateTicker";
import { labelDecorator } from "../lib/decorators/LabelDecorator";
import { setDialogue } from "../lib/functions/DialogueUtility";
import { removeImage } from "../lib/functions/ImageUtility";
import { GameWindowManager } from "../lib/managers/WindowManager";
import { StepLabelType } from "../lib/types/StepLabelType";

const bunny1Tag = "bunny1"
const bunny2Tag = "bunny2"
const bunny3Tag = "bunny3"

@labelDecorator()
export class TickerTestLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                let my_speed = 0.1
                const bunny = CanvasSprite.from('https://pixijs.com/assets/bunny.png');

                bunny.anchor.set(0.5);

                GameWindowManager.addChild(bunny1Tag, bunny);
                bunny.x = 100
                bunny.y = 100

                GameWindowManager.addTicker(bunny1Tag, RotateTicker, { speed: my_speed });
                setDialogue(`I have added a image with a tag ${bunny1Tag} and I connected a RotateTicker with a speed of ${my_speed} to it.`)
            },
            () => {
                let my_speed = 0.1
                const bunny = CanvasSprite.from('https://pixijs.com/assets/bunny.png');

                bunny.anchor.set(0.5);

                GameWindowManager.addChild(bunny2Tag, bunny);
                bunny.x = 200
                bunny.y = 200

                GameWindowManager.addTicker(bunny2Tag, RotateTicker, { speed: my_speed })
                setDialogue(`I have added a image with a tag ${bunny2Tag} and I connected a RotateTicker with a speed of ${my_speed} to it.`)
            },
            () => setDialogue(`Since ${bunny1Tag} and ${bunny2Tag} they have the same ticker with the same speed, only one RotateTicker will be performed`),
            () => {
                GameWindowManager.addTicker(bunny1Tag, RotateTicker, { speed: 0.2 })
                setDialogue(`I have changed the speed of the RotateTicker connected to ${bunny1Tag} to 0.2`)
            },
            () => setDialogue(`Since ${bunny1Tag} have a different speed, it will perform a different RotateTicker`),
            () => {
                removeImage(bunny1Tag)
                setDialogue(`I have remove the image with the tag ${bunny1Tag}`)
            },
            () => setDialogue(`Since ${bunny1Tag} is removed, the RotateTicker connected to it will not be performed`),
            () => {
                GameWindowManager.removeTickerConnectedToChild(bunny2Tag, RotateTicker)
                setDialogue(`I have removed the RotateTicker connected to ${bunny2Tag}`)
            },
            () => {
                removeImage(bunny2Tag)
                let duration = 7000
                const bunny = CanvasSprite.from('https://pixijs.com/assets/bunny.png');
                bunny.anchor.set(0.5);
                GameWindowManager.addChild(bunny3Tag, bunny);
                bunny.x = 300
                bunny.y = 300
                GameWindowManager.addTicker(bunny3Tag, RotateTicker, { speed: 0.1 }, duration)
                setDialogue(`I have added a image with a tag ${bunny3Tag} and I connected a RotateTicker with a speed of 0.1 and a duration of ${duration} to it. After ${duration}ms, the RotateTicker will be removed.`)
            },
            () => {
                let my_speed = 0.1
                let my_speed2 = 0.3
                const bunny = CanvasSprite.from('https://pixijs.com/assets/bunny.png');

                bunny.anchor.set(0.5);

                GameWindowManager.addChild(bunny1Tag, bunny);
                bunny.x = 100
                bunny.y = 100

                GameWindowManager.addTickersSteps(bunny1Tag, [
                    { className: RotateTicker, args: { speed: my_speed }, duration: 1000 },
                    { className: RotateTicker, args: { speed: my_speed2 }, duration: 1000 }
                ])
                setDialogue(`I have added a image with a tag ${bunny1Tag} and I connected a RotateTicker with a speed of ${my_speed} and a duration of 1000ms and then I connected a RotateTicker with a speed of ${my_speed2} and a duration of 1000ms to it.`)
            }
        ]
    }
}
