import { CanvasBaseItem } from "@drincs/pixi-vn";
import { StepLabelProps } from "@drincs/pixi-vn/dist/override";
import { ReactElement } from "react";
import { ImageTimeSlots } from "./model/TimeSlots";

declare module '@drincs/nqtr/dist/override' {
    interface OnRunProps extends StepLabelProps { }
    interface OnRenderGraphicItemProps extends StepLabelProps {
        addReactComponent: (component: ReactElement) => void;
        addCanvasComponent: (component: CanvasBaseItem<any>) => void;
        addImageTimeSlots: (image: ImageTimeSlots) => void;
    }
    interface GraphicItemInterface extends ImageTimeSlots { }
    interface OnStartEndStageQuest extends StepLabelProps { }
}
