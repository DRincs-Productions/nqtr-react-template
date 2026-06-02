import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { cn } from "@/lib/utils";
import { getPixiJSAsset } from "@/lib/utils/assets-utility";
import TimeSlotsImage from "@/models/TimeSlotsImage";
import useNqtrScreenStore from "@/stores/useNqtrScreenStore";
import type { OnRunProps } from "@drincs/nqtr";
import { Image } from "@unpic/react";
import { isValidElement, type ComponentProps, type CSSProperties, type ReactElement } from "react";

const BORDER_RADIUS_SCALE = 1.2;

export interface NavigationButtonProps extends ComponentProps<typeof Button> {
    selected?: boolean;
    circumference?: CSSProperties["width"];
    ariaLabel?: string;
    image?: string | TimeSlotsImage | ReactElement | ((props: OnRunProps) => ReactElement);
}

export default function NavigationButton(props: NavigationButtonProps) {
    const disabledScreen = useNqtrScreenStore((state: { disabled: boolean }) => state.disabled);
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

    const hasImageProp = imageProp !== undefined;
    let image: string | TimeSlotsImage | ReactElement | undefined = imageProp;

    if (typeof image === "function") {
        image = image(gameProps);
    }

    if (isValidElement(image)) {
        return image;
    }

    if (image instanceof TimeSlotsImage) {
        image = image.src;
    }

    let resolvedSrc: string | undefined;
    if (typeof image === "string") {
        try {
            resolvedSrc = getPixiJSAsset(image);
        } catch {
            resolvedSrc = image;
        }
    }

    // If an image prop was supplied but could not be resolved to renderable content, return null
    if (hasImageProp && resolvedSrc === undefined) {
        return null;
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
            {resolvedSrc && (
                <Image
                    src={resolvedSrc}
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
