import { getPixiJSAsset } from "@/lib/utils/assets-utility";
import TimeSlotsImage from "@/models/TimeSlotsImage";
import { useMemo } from "react";

export function useImageSrc(src?: string | TimeSlotsImage | null): string | undefined {
    return useMemo(() => {
        if (!src) {
            return undefined;
        }
        if (src instanceof TimeSlotsImage) {
            src = src.src;
        }
        return getPixiJSAsset(src);
    }, [src]);
}
