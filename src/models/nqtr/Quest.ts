import { QuestInterface, QuestStoredClass, QuestStoredClassProps, StageInterface } from "@drincs/nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Quest extends QuestStoredClass implements QuestInterface {
    constructor(
        id: string,
        _stages: StageInterface[],
        props: {
            name?: string;
            description?: string;
            image?: ImageTimeSlots;
            inDevelopment?: boolean;
        } & QuestStoredClassProps
    ) {
        super(id, _stages, props);
        this.name = props.name || "";
        this.description = props.description || "";
        this.image = props.image;
        this.inDevelopment = props.inDevelopment || false;
    }
    readonly name: string;
    readonly description: string;
    readonly image?: ImageTimeSlots;
    readonly inDevelopment: boolean;
}
