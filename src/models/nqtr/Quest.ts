import { OnRunProps, QuestInterface, StageInterface } from "@drincs/nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Quest extends QuestStoredClass implements QuestInterface {
    constructor(
        id: string,
        _stages: StageInterface[],
        props: {
            onStart?: (stage: QuestInterface, props: OnRunProps) => void;
            onNextStage?: (stage: QuestInterface, props: OnRunProps) => void;
            name?: string;
            description?: string;
            icon?: ImageTimeSlots;
            image?: ImageTimeSlots;
            inDevelopment?: boolean;
        } = {}
    ) {
        super(id, _stages, props);
        this.name = props.name || "";
        this.description = props.description || "";
        this.icon = props.icon;
        this.image = props.image;
        this.inDevelopment = props.inDevelopment || false;
    }
    name: string;
    description: string;
    icon?: ImageTimeSlots;
    image?: ImageTimeSlots;
    inDevelopment: boolean;
}
