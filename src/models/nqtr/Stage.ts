import { OnRunProps, QuestsRequiredType, StageInterface } from "@drincs/nqtr";
import { MyStageInterface, StageFlags } from "../../nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Stage extends StageStoredClass implements MyStageInterface {
    constructor(
        id: string,
        options: {
            onStart?: (stage: StageInterface, props: OnRunProps) => void;
            onEnd?: (stage: StageInterface, props: OnRunProps) => void;
            daysRequiredToStart?: number;
            questsRequiredToStart?: QuestsRequiredType[];
            name?: string;
            description?: string;
            adviceDescription?: string;
            image?: ImageTimeSlots;
            flags?: StageFlags[];
            flagsRequiredToStart?: StageFlags[];
            requestDescriptionToStart?: string;
        } = {}
    ) {
        super(id, options);
        this.name = options.name || "";
        this.description = options.description || "";
        this.adviceDescription = options.adviceDescription || "";
        this.image = options.image;
        this.flags = options.flags || [];
        this.flagsRequiredToStart = options.flagsRequiredToStart || [];
        this.requestDescriptionToStart = options.requestDescriptionToStart || "";
    }
    readonly name: string;
    readonly description: string;
    readonly adviceDescription: string;
    readonly image?: ImageTimeSlots;
    readonly flags: StageFlags[];
    readonly flagsRequiredToStart: StageFlags[];
    readonly requestDescriptionToStart: string;
}
