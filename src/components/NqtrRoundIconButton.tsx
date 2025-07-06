import { OnRunProps } from "@drincs/nqtr";
import { Assets } from "@drincs/pixi-vn";
import { useTheme } from "@mui/joy";
import { isValidElement, ReactElement } from "react";
import useGameProps from "../hooks/useGameProps";
import ImageTimeSlots from "../models/ImageTimeSlots";
import useNqtrScreenStore from "../stores/useNqtrScreenStore";
import RoundIconButton, { RoundIconButtonProps } from "./RoundIconButton";

interface NqtrRoundIconButtonProps extends RoundIconButtonProps {
    selected?: boolean;
}

export default function NqtrRoundIconButton(props: NqtrRoundIconButtonProps) {
    const disabledScreen = useNqtrScreenStore((state) => state.disabled);
    const { selected, sx, disabled = disabledScreen, ...rest } = props;

    return (
        <RoundIconButton
            className={`motion-scale-in-[0]`}
            sx={{
                "--IconButton-size": { xs: "40px", sm: "60px", md: "80px" },
                border: 3,
                borderColor: selected ? useTheme().palette.primary[800] : useTheme().palette.background.body,
                ...sx,
            }}
            elevation='lg'
            {...rest}
        />
    );
}

export function NqtrRoundIconButtonConvertor(
    props: NqtrRoundIconButtonProps & {
        image?: string | ImageTimeSlots | ReactElement | ((props: OnRunProps) => ReactElement);
    }
) {
    let { image, ...rest } = props;
    const gameProps = useGameProps();
    if (!image) {
        return;
    }
    if (typeof image === "function") {
        image = image(gameProps);
    }
    if (isValidElement(image)) {
        return image;
    }

    if (image instanceof ImageTimeSlots) {
        image = image.src;
    }

    if (typeof image == "string") {
        try {
            // check if the image is a PixiAsset
            image = Assets.resolver.resolve(image).src || image;
        } catch {}
        return (
            <NqtrRoundIconButton
                {...rest}
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" },
                    ...rest.sx,
                }}
            />
        );
    }
}
