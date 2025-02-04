import MapIcon from "@mui/icons-material/Map";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { AnimatePresence, motion } from "motion/react";
import RoundIconButton, { RoundIconButtonProps } from "../../components/RoundIconButton.tsx";
import StackOverflow from "../../components/StackOverflow.tsx.tsx";
import useMemoScreenStore from "../../stores/useMemoScreenStore.ts";

export default function NqtrQuickTools() {
    const editOpenMemo = useMemoScreenStore((state) => state.editOpen);

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
                    <QuickToolButton ariaLabel='hy'>
                        <SettingsIcon
                            sx={{
                                fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                            }}
                        />
                    </QuickToolButton>
                    <QuickToolButton ariaLabel='hy' onClick={editOpenMemo}>
                        <NoteAltIcon
                            sx={{
                                fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
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
                    <QuickToolButton ariaLabel='hy'>
                        <MapIcon
                            sx={{
                                fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
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
                circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
                sx={{
                    border: 3,
                }}
                elevation='lg'
                size='sm'
                variant='solid'
                color='primary'
                {...props}
            />
        </motion.div>
    );
}
