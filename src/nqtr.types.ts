import { StepLabelProps } from "@drincs/pixi-vn/dist/override";
import { ReactElement } from "react";
import ImageData from "./models/ImageData";

declare module '@drincs/nqtr/dist/override' {
    interface OnRunProps extends StepLabelProps { }
    interface OnRenderGraphicItemProps extends StepLabelProps {
        addReactComponent: (component: ReactElement) => void;
        addImageData: (image: ImageData | string) => void;
    }
    interface GraphicItemInterface extends ImageTimeSlots { }
    interface OnStartEndStageQuest extends StepLabelProps { }
}
