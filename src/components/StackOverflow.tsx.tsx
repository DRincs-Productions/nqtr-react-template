import { Box, Stack, StackProps } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
interface StackOverflowProps extends StackProps {
    maxLeght?: string | number;
}

function getStyleStackOverflowProps(
    direction: ResponsiveStyleValue<"row" | "row-reverse" | "column" | "column-reverse">,
    maxLeght?: string | number
) {
    let result: SxProps = {};
    if (direction === "row" || direction === "row-reverse") {
        result = {
            overflowX: "auto",
            flexDirection: "row",
            maxWidth: maxLeght,
        };
    } else {
        result = {
            overflowY: "auto",
            flexDirection: "column",
            maxHeight: maxLeght,
        };
    }
    return result;
}

export default function StackOverflow(props: StackOverflowProps) {
    const { direction = "column", children, maxLeght, sx, ...rest } = props;
    const sxStackOverflow = getStyleStackOverflowProps(direction, maxLeght);

    return (
        <Box
            sx={{
                ...sxStackOverflow,
                ...sx,
            }}
        >
            <Stack direction={direction} {...rest}>
                {children}
            </Stack>
        </Box>
    );
}
