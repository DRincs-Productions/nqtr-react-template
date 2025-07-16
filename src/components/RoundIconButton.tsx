import { IconButton, IconButtonProps, Shadow, Tooltip } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";
import useInterfaceStore from "../stores/useInterfaceStore";

export interface RoundIconButtonProps extends IconButtonProps {
    circumference?: string | {} | number;
    ariaLabel?: string;
    elevation?: keyof Shadow;
}

export default function RoundIconButton(props: RoundIconButtonProps) {
    const { sx, circumference, ariaLabel, elevation, ...rest } = props;
    const hidden = useInterfaceStore(useShallow((state) => state.hidden));

    return (
        <Tooltip key={props.key ? "tooltip-" + props.key : undefined} title={ariaLabel}>
            <div>
                {/* This div is necessary to avoid the tooltip to be cutted */}
                <IconButton
                    title={ariaLabel}
                    className={hidden ? "motion-scale-out-[0]" : "motion-scale-in-[0]"}
                    sx={{
                        borderRadius: "50%",
                        height: circumference,
                        width: circumference,
                        boxShadow: elevation ?? undefined,
                        pointerEvents: hidden ? "none" : "auto",
                        ...sx,
                    }}
                    {...rest}
                />
            </div>
        </Tooltip>
    );
}
