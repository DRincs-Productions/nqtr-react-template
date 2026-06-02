import { getPixiJSAsset } from "@/lib/utils/assets-utility";
import TimeSlotsImage from "@/models/TimeSlotsImage";
import { Image as UnpicImage } from "@unpic/react";
import type * as React from "react";
import { useMemo } from "react";

type ImageProps = Omit<React.ComponentProps<"img">, "src"> & {
    src?: string | TimeSlotsImage;
};

export function Image({
    src,
    loading = "lazy",
    width,
    height,
    ...props
}: ImageProps) {
    const resolvedSrc = useMemo(() => {
        const rawSrc = src instanceof TimeSlotsImage ? src.src : src;
        if (!rawSrc) {
            return undefined;
        }
        return getPixiJSAsset(rawSrc);
    }, [src]);

    if (!resolvedSrc) {
        return null;
    }

    const parsedWidth =
        typeof width === "number" ? width : width ? Number.parseFloat(width) : undefined;
    const parsedHeight =
        typeof height === "number" ? height : height ? Number.parseFloat(height) : undefined;

    if (
        parsedWidth !== undefined &&
        parsedHeight !== undefined &&
        Number.isFinite(parsedWidth) &&
        Number.isFinite(parsedHeight) &&
        parsedWidth > 0 &&
        parsedHeight > 0
    ) {
        return (
            <UnpicImage
                src={resolvedSrc}
                width={parsedWidth}
                height={parsedHeight}
                layout="constrained"
                loading={loading}
                {...props}
            />
        );
    }

    return <UnpicImage src={resolvedSrc} layout="fullWidth" loading={loading} {...props} />;
}
