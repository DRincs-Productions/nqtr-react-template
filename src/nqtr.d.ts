import { StepLabelProps } from "@drincs/pixi-vn/dist/override";
import { ReactElement } from "react";
import ImageTimeSlots from "./models/ImageTimeSlots";

declare module "@drincs/nqtr" {
    interface OnRunProps extends StepLabelProps {}
    interface OnStartEndStageQuest extends StepLabelProps {}
    interface ActivityInterface extends MyActivityInterface {}
    interface CommitmentInterface extends MyCommitmentInterface {}
    interface LocationInterface extends MyLocationInterface {}
    interface MapInterface extends MyMapInterface {}
    interface QuestInterface extends MyQuestInterface {}
    interface RoomInterface extends MyRoomInterface {}
    interface StageInterface extends MyStageInterface {}
}
interface StageFlags {
    /**
     * The flag for checking if the condition is met.
     */
    readonly flag: string;
    /**
     * The description of the flag.
     */
    readonly description: string;
}
interface MyActivityInterface {
    /**
     * The name of the activity.
     */
    readonly name: string;
    /**
     * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
     */
    get disabled(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set disabled(value: boolean | string);
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    get hidden(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set hidden(value: boolean | string);
    /**
     * The icon of the activity.
     */
    readonly icon: ImageTimeSlots | ReactElement | ((props: OnRunProps) => ReactElement);
}
interface MyCommitmentInterface {
    /**
     * The name of the commitment.
     */
    readonly name: string;
    /**
     * The image of the commitment.
     */
    readonly image: ImageTimeSlots;
    /**
     * The icon of the commitment.
     */
    readonly icon: ImageTimeSlots | ReactElement;
    /**
     * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
     */
    get disabled(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set disabled(value: boolean | string);
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    get hidden(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set hidden(value: boolean | string);
}
interface MyLocationInterface {
    /**
     * The name of the location.
     * If you set undefined, it will return the initial value of name.
     */
    readonly name: string;
    /**
     * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
     */
    get disabled(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set disabled(value: boolean | string);
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    get hidden(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set hidden(value: boolean | string);
    /**
     * The icon of the location.
     */
    readonly icon: ImageTimeSlots | ReactElement;
}
interface MyMapInterface {
    /**
     * The name of the map.
     */
    readonly name: string;
    /**
     * The image of the map.
     */
    readonly image: ImageTimeSlots;
}
interface MyQuestInterface {
    /**
     * The name of the quest.
     */
    readonly name: string;
    /**
     * The description of the quest.
     */
    readonly description: string;
    /**
     * The function for rendering the image of the quest.
     */
    readonly image?: ImageTimeSlots;
    /**
     * If the quest is in development.
     */
    readonly inDevelopment: boolean;
}
interface MyRoomInterface {
    /**
     * The name.
     * If you set undefined, it will return the initial value of name.
     */
    readonly name: string;
    /**
     * The image of the room.
     */
    readonly image: ImageTimeSlots;
    /**
     * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
     */
    get disabled(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set disabled(value: boolean | string);
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    get hidden(): boolean;
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set hidden(value: boolean | string);
    /**
     * The icon of the room.
     */
    readonly icon: ImageTimeSlots | ReactElement;
    /**
     * If is the entrance of the location. (the first room)
     */
    readonly isEntrance: boolean;
}
interface MyStageInterface {
    /**
     * The name of the stage.
     */
    readonly name: string;

    /**
     * The description of the stage.
     */
    readonly description: string;

    /**
     * The advice description of the stage.
     */
    readonly adviceDescription: string;

    /**
     * The image of the stage.
     */
    readonly image?: ImageTimeSlots;

    /**
     * The list of flags that the player must complete to finish the stage.
     */
    readonly flags: StageFlags[];

    /**
     * The list of flags required to start the stage.
     */
    readonly flagsRequiredToStart: StageFlags[];

    /**
     * The description of the request to start the stage.
     */
    readonly requestDescriptionToStart: string;
}
