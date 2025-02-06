import { AnimatePresence } from "motion/react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { NavigationRoundIconButtonConvertor } from "../../components/NavigationRoundIconButton";
import StackOverflow from "../../components/StackOverflow.tsx";
import { useQueryCurrentRoom } from "../../use_query/useQueryNQTR";
import { useMyNavigate } from "../../utils/navigate-utility";

export default function QuickActivities() {
    const navigate = useMyNavigate();
    const { t: tNarration } = useTranslation(["narration"]);
    const { t } = useTranslation(["ui"]);
    const { enqueueSnackbar } = useSnackbar();
    const { data: { activities = [], routine = [] } = {} } = useQueryCurrentRoom();

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
                                t: tNarration,
                                uiTransition: t,
                                notify: (message, variant) => enqueueSnackbar(t(message), { variant }),
                            });
                        }}
                        ariaLabel={t(item.name)}
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
                                t: tNarration,
                                uiTransition: t,
                                notify: (message, variant) => enqueueSnackbar(t(message), { variant }),
                            });
                        }}
                        ariaLabel={t(item.name)}
                        image={item.icon}
                    />
                ))}
            </AnimatePresence>
        </StackOverflow>
    );
}
