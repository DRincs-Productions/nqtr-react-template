import { OnRunProps } from "@drincs/nqtr";
import { Assets } from "@drincs/pixi-vn";
import { useTheme } from "@mui/joy";
import { motion } from "motion/react";
import { useSnackbar } from "notistack";
import { isValidElement, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import ImageTimeSlots from "../models/ImageTimeSlots";
import { useMyNavigate } from "../utils/navigate-utility";
import RoundIconButton, { RoundIconButtonProps } from "./RoundIconButton";

interface NavigationRoundIconButtonProps extends RoundIconButtonProps {
    selected?: boolean;
}

export default function NavigationRoundIconButton(props: NavigationRoundIconButtonProps) {
    const { selected, sx, ...rest } = props;

    return (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ ease: "easeOut" }}>
            <RoundIconButton
                circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
                sx={{
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
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    if (!image) {
        return;
    }
    if (typeof image === "function") {
        image = image({
            navigate: navigate,
            t: t,
            notify: (message, variant) => enqueueSnackbar(message, { variant }),
        });
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
                    ...rest.sx,
                }}
            />
        );
    }
}
