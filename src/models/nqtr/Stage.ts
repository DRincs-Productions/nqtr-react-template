import { StageInterface } from "@drincs/nqtr";
import StageStoredClass from "@drincs/nqtr/dist/classes/quest/StageStoredClass";
import { MyStageInterface, StageFlags } from "../../nqtr";

export default class Stage extends StageStoredClass implements MyStageInterface {
    constructor(
        id: string,
        options?: {
            onStart?: (stage: StageInterface, props: OnStartEndStageQuest) => void;
            onEnd?: (stage: StageInterface, props: OnStartEndStageQuest) => void;
            daysRequiredToStart?: number;
            questsRequiredToStart?: QuestsRequiredType[];
            name: string;
            description: string;
            adviceDescription: string;
            image?: string;
            flags: StageFlags[];
            flagsRequiredToStart: StageFlags[];
            requestDescriptionToStart: string;
        }
    ) {
        super(id, options);
        this.name = options.name;
        this.description = options.description;
        this.adviceDescription = options.adviceDescription;
        this.image = options.image;
        this.flags = options.flags;
        this.flagsRequiredToStart = options.flagsRequiredToStart;
        this.requestDescriptionToStart = options.requestDescription;
    }
    readonly name: string;
    readonly description: string;
    readonly adviceDescription: string;
    readonly image?: string | undefined;
    readonly flags: StageFlags[];
    readonly flagsRequiredToStart: StageFlags[];
    readonly requestDescriptionToStart: string;
}
