import { Link, LinkProps } from "@drincs/react-components";

export default function TextMenuButton(props: LinkProps) {
    const {
        sx,
        ...rest
    } = props;

    return (
        <Link
            sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem", lg: "1rem", xl: "1.1rem" },
                userSelect: "none",
                ...sx
            }}
            selectedTextColor={"primary.500"}
            disabledTextColor={"neutral.500"}
            textColor={"neutral.300"}
            {...rest}
        >
            <Typography
                textColor={
                    selected ? useTheme().palette.primary[500] :
                        disabled ? useTheme().palette.neutral[500] :
                            useTheme().palette.neutral[300]
                }
                sx={{
                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem", lg: "1rem", xl: "1.1rem" },
                    userSelect: "none",
                    textShadow: `0 0 3px ${useTheme().palette.common.black}, 0 0 5px ${useTheme().palette.common.black}`,
                    pointerEvents: "auto",
                }}
            >
                {children}
            </Typography>
        </Link>
    );
}
