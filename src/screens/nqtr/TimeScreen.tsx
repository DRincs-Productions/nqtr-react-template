import { timeTracker } from "@drincs/nqtr";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Stack, Typography, useTheme } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import RoundIconButton from "../../components/RoundIconButton";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../hooks/useQueryInterface";
import { useQueryTime } from "../../hooks/useQueryNQTR";
import useTimeTracker from "../../hooks/useTimeTracker";
import useNqtrScreenStore from "../../stores/useNqtrScreenStore";

export default function TimeScreen() {
    const { t } = useTranslation(["ui"]);
    const { wait } = useTimeTracker();
    const { data: hour = 0 } = useQueryTime();
    const queryClient = useQueryClient();
    const disabled = useNqtrScreenStore((state) => state.disabled);

    return (
        <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={0}
            sx={{
                marginTop: "0.5rem",
                opacity: 0.5,
                ":hover": {
                    opacity: 1,
                },
            }}
            className='motion-preset-bounce'
        >
            <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={0}
                height={{ xs: "0.7rem", sm: "1rem", md: "1.5rem", lg: "2rem", xl: "3rem" }}
            >
                <Typography
                    fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" }}
                    sx={{
                        color: useTheme().palette.common.white,
                        textShadow: `0 0 3px ${useTheme().palette.common.black}, 0 0 5px ${
                            useTheme().palette.common.black
                        }`,
                        pointerEvents: "auto",
                        userSelect: "none",
                    }}
                >
                    {hour > 9 ? `${hour}:00` : `0${hour}:00`}
                </Typography>
                <RoundIconButton
                    variant='soft'
                    ariaLabel={t("wait")}
                    sx={{
                        padding: 0,
                        border: 0,
                        marginTop: "0.5rem",
                        backgroundColor: "#0000007c",
                    }}
                    onClick={() => {
                        wait(1);
                        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] });
                    }}
                    elevation='sm'
                    disabled={disabled}
                >
                    <AccessTimeIcon
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.5rem", lg: "1.7rem", xl: "2rem" },
                            color: useTheme().palette.common.white,
                        }}
                    />
                </RoundIconButton>
            </Stack>
            <Typography
                fontSize={{ xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem", xl: "2rem" }}
                sx={{
                    color: useTheme().palette.common.white,
                    textShadow: `0 0 3px ${useTheme().palette.common.black}, 0 0 5px ${
                        useTheme().palette.common.black
                    }`,
                    pointerEvents: "auto",
                    userSelect: "none",
                }}
            >
                {timeTracker.currentDayName ? t(timeTracker.currentDayName) : ""}
            </Typography>
        </Stack>
    );
}
