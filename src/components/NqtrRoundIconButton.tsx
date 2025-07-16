import { OnRunProps } from "@drincs/nqtr";
import { useTheme } from "@mui/joy";
import { isValidElement, ReactElement } from "react";
import useGameProps from "../hooks/useGameProps";
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
        image?: ReactElement | ((props: OnRunProps) => ReactElement);
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

    if (typeof image == "string") {
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
