import { AnimatePresence } from "motion/react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { NavigationRoundIconButtonConvertor } from "../../components/NavigationRoundIconButton";
import StackOverflow from "../../components/StackOverflow.tsx";
import { useQueryCurrentActivities, useQueryCurrentRoutine } from "../../use_query/useQueryNQTR";
import { useMyNavigate } from "../../utils/navigate-utility";

export default function QuickActivities() {
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const { data: activities = [] } = useQueryCurrentActivities();
    const { data: routine = [] } = useQueryCurrentRoutine();

    return (
        <StackOverflow
            direction='column'
            justifyContent='center'
            alignItems='flex-end'
            spacing={0.5}
            maxLeght={"100%"}
            sx={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                right: 0,
                pointerEvents: "auto",
            }}
        >
            <AnimatePresence>
                {activities.map((item) => (
                    <NavigationRoundIconButtonConvertor
                        key={"activity" + item.id}
                        disabled={item.disabled}
                        onClick={() => {
                            item.run({
                                navigate: navigate,
                                t: t,
                                notify: (message, variant) => enqueueSnackbar(message, { variant }),
                            });
                        }}
                        ariaLabel={item.name}
                        image={item.icon}
                    />
                ))}
                {routine.map((item) => (
                    <NavigationRoundIconButtonConvertor
                        key={"commitment" + item.id}
                        disabled={item.disabled}
                        onClick={() => {
                            item.run({
                                navigate: navigate,
                                t: t,
                                notify: (message, variant) => enqueueSnackbar(message, { variant }),
                            });
                        }}
                        ariaLabel={item.name}
                        image={item.icon}
                    />
                ))}
            </AnimatePresence>
        </StackOverflow>
    );
}
