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

export interface MediaButtonProps extends ComponentProps<typeof Button> {
    selected?: boolean;
    circumference?: CSSProperties["width"];
    ariaLabel?: string;
}

export default function MediaButton(props: MediaButtonProps) {
    const disabledScreen = useNqtrScreenStore((state: { disabled: boolean }) => state.disabled);
    const {
        selected,
        circumference,
        ariaLabel,
        className,
        style,
        disabled = disabledScreen,
        children,
        ...rest
    } = props;

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

export function MediaButtonConverter(
    props: MediaButtonProps & {
        image?: string | TimeSlotsImage | ReactElement | ((props: OnRunProps) => ReactElement);
    },
) {
    let { image, children, ...rest } = props;
    const gameProps = useGameProps();

    if (!image) {
        return null;
    }

    if (typeof image === "function") {
        image = image(gameProps);
    }

    if (isValidElement(image)) {
        return image;
    }

    if (image instanceof TimeSlotsImage) {
        image = image.src;
    }

    if (typeof image === "string") {
        try {
            image = getPixiJSAsset(image);
        } catch {}

        return (
            <MediaButton {...rest}>
                <Image
                    src={image}
                    alt={rest.ariaLabel ?? ""}
                    layout="constrained"
                    width={128}
                    height={128}
                    className="absolute inset-0 size-full object-cover"
                />
                {children}
            </MediaButton>
        );
    }

    return null;
}
