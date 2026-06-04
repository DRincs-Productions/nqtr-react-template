import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { GameStatus } from "@/lib/stores/game-status-store";
import { cn } from "@/lib/utils";
import type TimeSlotsImage from "@/models/TimeSlotsImage";
import type { OnRunProps } from "@drincs/nqtr";
import { useSelector } from "@tanstack/react-store";
import { isValidElement, type ComponentProps, type CSSProperties, type ReactElement } from "react";

const BORDER_RADIUS_SCALE = 1.2;

export interface NavigationButtonProps extends ComponentProps<typeof Button> {
    selected?: boolean;
    circumference?: CSSProperties["width"];
    ariaLabel?: string;
    image?: string | TimeSlotsImage | ReactElement | ((props: OnRunProps) => ReactElement);
}

export default function NavigationButton(props: NavigationButtonProps) {
    const disabledScreen = useSelector(GameStatus.store, (state) => state.loading);
    const gameProps = useGameProps();
    const {
        image: imageProp,
        selected,
        circumference,
        ariaLabel,
        className,
        style,
        disabled = disabledScreen,
        children,
        ...rest
    } = props;

    let image = imageProp;

    if (typeof image === "function") {
        image = image(gameProps);
    }

    if (isValidElement(image)) {
        return image;
    }

    const trigger = (
        <Button
            {...rest}
            disabled={disabled}
            title={ariaLabel}
            aria-label={ariaLabel}
            size={props.size ?? "icon-lg"}
            className={cn(
                "relative size-10 overflow-hidden border-3 shadow-lg sm:size-14 md:size-20",
                selected ? "border-primary" : "border-background",
                className,
            )}
            style={{
                borderRadius: `calc(var(--radius-lg) * ${BORDER_RADIUS_SCALE})`,
                ...(circumference ? { width: circumference, height: circumference } : undefined),
                ...style,
            }}
        >
            {image && (
                <Image
                    src={image}
                    alt={ariaLabel ?? ""}
                    layout="constrained"
                    width={128}
                    height={128}
                    className="absolute inset-0 size-full object-cover"
                />
            )}
            {children}
        </Button>
    );

    if (!ariaLabel) {
        return trigger;
    }

    return (
        <Tooltip>
            <TooltipTrigger render={<span />}>{trigger}</TooltipTrigger>
            <TooltipContent>{ariaLabel}</TooltipContent>
        </Tooltip>
    );
}
