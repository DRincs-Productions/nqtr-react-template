import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, useTheme } from "@mui/joy";
import { useMemo } from "react";
import useInterfaceStore from "../stores/useInterfaceStore";

export default function VisibilityButton() {
    const hidden = useInterfaceStore((state) => state.hidden);
    const setHideInterface = useInterfaceStore((state) => state.editHidden);
    const iconVarians = useMemo(() => (hidden ? `motion-preset-pop` : `motion-scale-out-0`), [hidden]);

    return (
        <IconButton
            onClick={setHideInterface}
            sx={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
            className={iconVarians}
        >
            <VisibilityOffIcon
                sx={{
                    color: useTheme().palette.neutral[500],
                }}
            />
        </IconButton>
    );
}
