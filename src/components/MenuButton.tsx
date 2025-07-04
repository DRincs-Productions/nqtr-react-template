import { Button, ButtonProps, ButtonTypeMap } from "@mui/joy";

interface MenuButtonProps
    extends ButtonProps<
        ButtonTypeMap["defaultComponent"],
        {
            component?: React.ElementType;
        }
    > {
    transitionDelay?: number;
}

export default function MenuButton(props: MenuButtonProps) {
    const { sx, transitionDelay, ...rest } = props;

    return (
        <Button
            size='sm'
            sx={{
                fontSize: { xs: "0.75rem", sm: "0.75rem", md: "1rem", lg: "1.25rem", xl: "1.5rem" },
                ...sx,
            }}
            className='motion-preset-pop'
            {...rest}
        />
    );
}
