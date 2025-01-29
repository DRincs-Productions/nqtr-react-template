import { QuestInterface, StageInterface } from "@drincs/nqtr";
import QuestStoredClass from "@drincs/nqtr/dist/classes/quest/QuestStoredClass";

export default class Quest extends QuestStoredClass implements QuestInterface {
    constructor(
        id: string,
        _stages: StageInterface[],
        props: {
            onStart?: (stage: QuestInterface, props: OnRunProps) => void;
            onNextStage?: (stage: QuestInterface, props: OnRunProps) => void;
            name?: string;
            description?: string;
            icon?: string;
            image?: string;
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
    icon?: string | undefined;
    image?: string | undefined;
    inDevelopment: boolean;
}
