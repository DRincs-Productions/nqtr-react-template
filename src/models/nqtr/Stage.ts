import { OnRunProps, QuestsRequiredType, StageInterface, StageStoredClass, StageStoredClassProps } from "@drincs/nqtr";
import { StageFlags } from "../../nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Stage extends StageStoredClass implements StageInterface {
    constructor(
        id: string,
        options: {
            onStart?: (stage: StageInterface, props: OnRunProps) => void;
            onEnd?: (stage: StageInterface, props: OnRunProps) => void;
            deltaDateRequired?: number;
            questsRequired?: QuestsRequiredType[];
            name?: string;
            description?: string;
            adviceDescription?: string;
            image?: ImageTimeSlots;
            flags?: StageFlags[];
            flagsRequired?: StageFlags[];
            requestDescriptionToStart?: string;
        } & StageStoredClassProps
    ) {
        super(id, options);
        this.name = options.name || "";
        this.description = options.description || "";
        this.adviceDescription = options.adviceDescription || "";
        this.image = options.image;
        this.flags = options.flags || [];
        this.flagsRequired = options.flagsRequired || [];
        this.requestDescriptionToStart = options.requestDescriptionToStart || "";
    }
    readonly name: string;
    readonly description: string;
    readonly adviceDescription: string;
    readonly image?: ImageTimeSlots;
    readonly flags: StageFlags[];
    readonly flagsRequired: StageFlags[];
    readonly requestDescriptionToStart: string;
}
