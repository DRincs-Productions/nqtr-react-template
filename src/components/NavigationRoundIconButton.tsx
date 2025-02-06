import { OnRunProps } from "@drincs/nqtr";
import { Assets } from "@drincs/pixi-vn";
import { useTheme } from "@mui/joy";
import { motion } from "motion/react";
import { isValidElement, ReactElement } from "react";
import useGameProps from "../hooks/useGameProps";
import ImageTimeSlots from "../models/ImageTimeSlots";
import RoundIconButton, { RoundIconButtonProps } from "./RoundIconButton";

interface NavigationRoundIconButtonProps extends RoundIconButtonProps {
    selected?: boolean;
}

export default function NavigationRoundIconButton(props: NavigationRoundIconButtonProps) {
    const { selected, sx, ...rest } = props;

    return (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ ease: "easeOut" }}>
            <RoundIconButton
                sx={{
                    "--IconButton-size": { xs: "40px", sm: "60px", md: "80px" },
                    border: 3,
                    borderColor: selected ? useTheme().palette.primary[800] : useTheme().palette.background.body,
                    ...sx,
                }}
                elevation='lg'
                {...rest}
            />
        </motion.div>
    );
}

export function NavigationRoundIconButtonConvertor(
    props: NavigationRoundIconButtonProps & {
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
            <NavigationRoundIconButton
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
