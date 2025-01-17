import { timeTracker } from '@drincs/nqtr';
import { RoundIconButton, Stack, Typography, useTheme } from '@drincs/react-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from "motion/react";
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { INTERFACE_DATA_USE_QUEY_KEY } from '../../use_query/useQueryInterface';
import { useQueryTime } from '../../use_query/useQueryNQTR';
import { wait } from '../../utils/TimeUtility';

export default function TimeScreen() {
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const { data: hour = 0 } = useQueryTime()
    const queryClient = useQueryClient()

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
                marginTop: "0.5rem",
                opacity: 0.5,
                ":hover": {
                    opacity: 1,
                },
            }}
            component={motion.div}
            variants={{
                open: {
                    opacity: 1,
                    y: 0,
                    pointerEvents: "auto",
                },
                closed: {
                    opacity: 0,
                    y: -100,
                    pointerEvents: "none",
                }
            }}
            initial={"closed"}
            animate={"open"}
            exit={"closed"}
            transition={{ type: "tween" }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
                height={{ xs: "0.7rem", sm: "1rem", md: "1.5rem", lg: "2rem", xl: "3rem" }}
            >
                <Typography
                    fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" }}
                    sx={{
                        color: useTheme().palette.common.white,
                        textShadow: `0 0 3px ${useTheme().palette.common.black}, 0 0 5px ${useTheme().palette.common.black}`,
                        pointerEvents: "auto",
                        userSelect: "none",
                    }}
                >
                    {hour > 9 ? `${hour}:00` : `0${hour}:00`}
                </Typography>
                <RoundIconButton
                    variant="soft"
                    ariaLabel={t("wait")}
                    sx={{
                        padding: 0,
                        border: 0,
                        marginTop: "0.5rem",
                        backgroundColor: "#0000007c",
                    }}
                    onClick={() => {
                        wait(1, (message, variant) => enqueueSnackbar(message, { variant }))
                        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                    }}
                    elevation="sm"
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
                    textShadow: `0 0 3px ${useTheme().palette.common.black}, 0 0 5px ${useTheme().palette.common.black}`,
                    pointerEvents: "auto",
                    userSelect: "none",
                }}
            >
                {timeTracker.currentDayName ? t(timeTracker.currentDayName) : ""}
            </Typography>
        </Stack>
    );
}
