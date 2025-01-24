import { StepLabelProps } from "@drincs/pixi-vn/dist/override";

declare module '@drincs/nqtr/dist/override' {
    interface OnRunProps extends StepLabelProps { }
    interface OnStartEndStageQuest extends StepLabelProps { }
    interface ActivityInterface {
        /**
         * The name of the activity.
         */
        name: string;
        /**
         * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
         */
        disabled: boolean;
        /**
         * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
         */
        hidden: boolean;
        /**
         * The icon of the activity.
         */
        readonly icon: string | undefined;
    }
}
