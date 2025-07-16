import { ContainerChild, StepLabelProps } from "@drincs/pixi-vn";
import { ReactElement } from "react";
import ImageTimeSlots from "./models/ImageTimeSlots";

declare module "@drincs/nqtr" {
    interface OnRunProps extends StepLabelProps {}
    interface ActivityInterface {
        /**
         * The name of the activity.
         */
        readonly name: string;
        /**
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
        /**
         * The icon of the activity.
         */
        readonly icon?: ReactElement | ((props: OnRunProps) => ReactElement);
    }
    interface CommitmentInterface {
        /**
         * The name of the commitment.
         */
        readonly name: string;
        /**
         * The image of the commitment.
         */
        readonly image?: ImageTimeSlots;
        /**
         * The icon of the commitment.
         */
        readonly icon?: ReactElement | ((props: OnRunProps) => ReactElement);
        /**
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
    }
    interface LocationInterface {
        /**
         * The name of the location.
         * If you set undefined, it will return the initial value of name.
         */
        readonly name: string;
        /**
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
        /**
         * The icon of the location.
         */
        readonly icon?: ContainerChild | ((props: OnRunProps) => ContainerChild);
        /**
         * The entrance room of the location.
         */
        readonly entrance: RoomInterface | undefined;
    }
    interface MapInterface {
        /**
         * The name of the map.
         */
        readonly name: string;
        /**
         * The image of the map.
         */
        readonly image: ImageTimeSlots;
        /**
         * Neighboring maps.
         */
        readonly neighboringMaps: NeighboringMaps;
    }
    interface QuestInterface {
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
    interface RoomInterface {
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
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
        /**
         * If is the entrance of the location. (the first room)
         */
        readonly isEntrance: boolean;
    }
    interface StageInterface {
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
        readonly flagsRequired: StageFlags[];

        /**
         * The description of the request to start the stage.
         */
        readonly requestDescriptionToStart: string;
    }
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
interface NeighboringMaps {
    north?: string;
    south?: string;
    east?: string;
    west?: string;
}
