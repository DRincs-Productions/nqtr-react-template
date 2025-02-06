import MapIcon from "@mui/icons-material/Map";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import RoundIconButton, { RoundIconButtonProps } from "../../components/RoundIconButton.tsx";
import StackOverflow from "../../components/StackOverflow.tsx.tsx";
import useMemoScreenStore from "../../stores/useMemoScreenStore.ts";
import useSettingsScreenStore from "../../stores/useSettingsScreenStore.ts";

export default function NqtrQuickTools() {
    const editOpenMemo = useMemoScreenStore((state) => state.editOpen);
    const editOpenSettings = useSettingsScreenStore((state) => state.editOpen);
    const { t } = useTranslation(["ui"]);

    return (
        <>
            <StackOverflow
                direction='row'
                justifyContent='center'
                alignItems='flex-end'
                spacing={0.5}
                maxLeght={"80%"}
                sx={{
                    display: "flex",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    pointerEvents: "auto",
                }}
            >
                <AnimatePresence>
                    <QuickToolButton ariaLabel={t("settings")} onClick={editOpenSettings}>
                        <SettingsIcon
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                            }}
                        />
                    </QuickToolButton>
                    <QuickToolButton ariaLabel={t("memo")} onClick={editOpenMemo}>
                        <NoteAltIcon
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                            }}
                        />
                    </QuickToolButton>
                </AnimatePresence>
            </StackOverflow>
            <StackOverflow
                direction='row'
                justifyContent='center'
                alignItems='flex-end'
                spacing={0.5}
                maxLeght={"80%"}
                sx={{
                    display: "flex",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    pointerEvents: "auto",
                }}
            >
                <AnimatePresence>
                    <QuickToolButton ariaLabel={t("map")}>
                        <MapIcon
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                            }}
                        />
                    </QuickToolButton>
                </AnimatePresence>
            </StackOverflow>
        </>
    );
}

function QuickToolButton(props: RoundIconButtonProps) {
    return (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ ease: "easeOut" }}>
            <RoundIconButton
                sx={{
                    border: 3,
                    "--IconButton-size": { xs: "40px", sm: "60px", md: "80px" },
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" },
                }}
                elevation='lg'
                variant='solid'
                color='primary'
                {...props}
            />
        </motion.div>
    );
}
