import { OnRunProps } from "@drincs/nqtr";
import { TFunction } from "i18next";
import { OptionsWithExtraProps, SnackbarKey, SnackbarMessage } from "notistack";
import { NavigateFunction } from "react-router-dom";

declare module "@drincs/pixi-vn" {
    interface StepLabelResult {
        [key: string]: any;
    }
    interface StepLabelProps {
        /**
         * function to navigate to a new route.
         * @param route The route to navigate to.
         * @returns
         */
        navigate: NavigateFunction;
        /**
         * Translate a key to a string.
         * @param key The key to translate.
         * @returns The translated string.
         */
        t: TFunction<[string], undefined>;
        /**
         * Translate a key to a string using the UI strings.
         * @param key The key to translate.
         * @returns The translated string.
         */
        uiTransition: TFunction<[string], undefined>;
        /**
         * Show a notification.
         * @param message The message to show.
         * @param variant The variant of the notification.
         * @returns
         */
        notify: (
            message: SnackbarMessage,
            options?: OptionsWithExtraProps<"default" | "error" | "success" | "warning" | "info">
        ) => SnackbarKey;
        /**
         * Invalidate the interface data.
         * This will cause the interface to be reloaded and the data to be fetched again.
         */
        invalidateInterfaceData: () => void;
        /**
         * Sleep for a new day.
         * @param newDayHour The hour of the new day.
         * @param props The props of the step label.
         * @returns Whether the sleep was successful.
         */
        sleep: (newDayHour: number, props: OnRunProps) => boolean;
        /**
         * Wait for a certain amount of time.
         * @param timeSpent The amount of time to wait.
         * @returns Whether the wait was successful.
         */
        wait: (timeSpent: number) => boolean;
    }
    interface CharacterInterface {
        /**
         * The name of the character.
         * If you set undefined, it will return the default name.
         */
        name: string;
        /**
         * The surname of the character.
         * If you set undefined, it will return the default surname.
         */
        surname?: string;
        /**
         * The age of the character.
         * If you set undefined, it will return the default age.
         */
        age?: number;
        /**
         * The icon of the character.
         */
        readonly icon?: string;
        /**
         * The color of the character.
         */
        readonly color?: string;
    }
    interface DialogueInterface {
        /**
         * The text of the dialogue.
         */
        text: string | string[];
        /**
         * The id of the character that is speaking.
         */
        character?: CharacterInterface | string;
    }
    interface ChoiceInterface {
        /**
         * Text to be displayed in the menu
         */
        text: string;
        /**
         * Label Id to be opened when the option is selected
         */
        label: LabelIdType | CloseType;
        /**
         * Type of the label to be opened
         */
        type: LabelRunModeType | CloseType;
        /**
         * If this is true, the choice can only be made once.
         */
        oneTime?: boolean;
        /**
         * If this is true, the choice can see only if there are no other choices. For example, all choices are one-time choices and they are already selected.
         */
        onlyHaveNoChoice?: boolean;
        /**
         * If this is true and if is the only choice, it will be automatically selected, and call/jump to the label.
         */
        autoSelect?: boolean;
        /**
         * If true, the current label will be closed
         */
        closeCurrentLabel?: boolean;
        /**
         * Properties to be passed to the label and olther parameters that you can use when get all the choice menu options.
         */
        props?: StorageObjectType;
    }
}
