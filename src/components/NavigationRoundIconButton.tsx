import { OnRunProps } from "@drincs/nqtr";
import { ImageBackdrop, ImageSrc, RoundIconButton, RoundIconButtonProps, useTheme } from "@drincs/react-components";
import { motion } from "motion/react";
import { useSnackbar } from "notistack";
import { isValidElement, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import ImageTimeSlots from "../models/ImageTimeSlots";
import { useMyNavigate } from "../utils/navigate-utility";

interface NavigationRoundIconButtonProps extends RoundIconButtonProps {
    selected?: boolean;
}

export default function NavigationRoundIconButton(props: NavigationRoundIconButtonProps) {
    const { selected, sx, ...rest } = props;

    return (
        <RoundIconButton
            circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
            sx={{
                border: 3,
                borderColor: selected ? useTheme().palette.primary[800] : useTheme().palette.background.body,
                ...sx,
            }}
            elevation='lg'
            component={motion.div}
            initial={{
                scale: 0,
            }}
            animate={{
                scale: 1,
            }}
            exit={{
                scale: 0,
            }}
            transition={{ ease: "easeOut" }}
            {...rest}
        />
    );
}

export function NavigationRoundIconButtonConvertor(
    props: NavigationRoundIconButtonProps & {
        image?: ImageTimeSlots | ReactElement | ((props: OnRunProps) => ReactElement);
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
    } else if (image instanceof ImageTimeSlots) {
        return (
            <NavigationRoundIconButton {...rest}>
                {image && <ImageSrc image={image.src} />}
                {image && <ImageBackdrop />}
            </NavigationRoundIconButton>
        );
    }
}
