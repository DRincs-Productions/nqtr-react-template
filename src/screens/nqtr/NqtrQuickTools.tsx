import MapIcon from "@mui/icons-material/Map";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import RoundIconButton, { RoundIconButtonProps } from "../../components/RoundIconButton.tsx";
import StackOverflow from "../../components/StackOverflow.tsx.tsx";
import { MAP_ROUTE } from "../../constans.ts";
import useMyNavigate from "../../hooks/useMyNavigate.ts";
import { INTERFACE_DATA_USE_QUEY_KEY } from "../../hooks/useQueryInterface.ts";
import { CURRENT_MAP_USE_QUEY_KEY } from "../../hooks/useQueryNQTR.ts";
import useInterfaceStore from "../../stores/useInterfaceStore.ts";
import useMemoScreenStore from "../../stores/useMemoScreenStore.ts";
import useSettingsScreenStore from "../../stores/useSettingsScreenStore.ts";

export default function NqtrQuickTools() {
    const editOpenMemo = useMemoScreenStore((state) => state.editOpen);
    const editOpenSettings = useSettingsScreenStore((state) => state.editOpen);
    const navigate = useMyNavigate();
    const queryClient = useQueryClient();
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
                }}
            >
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
                }}
            >
                <QuickToolButton
                    ariaLabel={t("map")}
                    onClick={() => {
                        queryClient.invalidateQueries({
                            queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CURRENT_MAP_USE_QUEY_KEY],
                        });
                        navigate(MAP_ROUTE);
                    }}
                >
                    <MapIcon
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                        }}
                    />
                </QuickToolButton>
            </StackOverflow>
        </>
    );
}

function QuickToolButton(props: RoundIconButtonProps) {
    const hidden = useInterfaceStore(useShallow((state) => state.hidden));

    return (
        <RoundIconButton
            sx={{
                border: 3,
                "--IconButton-size": { xs: "40px", sm: "60px", md: "80px" },
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" },
                pointerEvents: hidden ? "none" : "auto",
            }}
            elevation='lg'
            variant='solid'
            color='primary'
            className={hidden ? "motion-scale-out-[0]" : "motion-scale-in-[0]"}
            {...props}
        />
    );
}
