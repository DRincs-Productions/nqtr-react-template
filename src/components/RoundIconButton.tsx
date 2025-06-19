import { IconButton, IconButtonProps, Shadow, Tooltip } from "@mui/joy";

export interface RoundIconButtonProps extends IconButtonProps {
    circumference?: string | {} | number;
    ariaLabel?: string;
    elevation?: keyof Shadow;
}

export default function RoundIconButton(props: RoundIconButtonProps) {
    const { sx, circumference, ariaLabel, elevation, ...rest } = props;

    return (
        <Tooltip key={props.key ? "tooltip-" + props.key : undefined} title={ariaLabel}>
            <div>
                {/* This div is necessary to avoid the tooltip to be cutted */}
                <IconButton
                    title={ariaLabel}
                    sx={{
                        borderRadius: "50%",
                        height: circumference,
                        width: circumference,
                        boxShadow: elevation ?? undefined,
                        ...sx,
                    }}
                    {...rest}
                />
            </div>
        </Tooltip>
    );
}
