import { AspectRatio, Box, Divider, Link, Sheet, Stack, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import ModalDialogCustom from "../../components/ModalDialog";
import useEventListener from "../../hooks/useKeyDetector";
import useMemoScreenStore from "../../stores/useMemoScreenStore";

export default function MemoScreen() {
    const { t } = useTranslation(["ui"]);
    const open = useMemoScreenStore((state) => state.open);
    const editOpen = useMemoScreenStore((state) => state.editOpen);
    const quests = useMemoScreenStore((state) => state.startedQuests);
    const completedQuests = useMemoScreenStore((state) => state.completedQuests);
    const selectedQuest = useMemoScreenStore((state) => state.selectedQuest);
    const setSelectedQuest = useMemoScreenStore((state) => state.setSelectedQuest);

    useEventListener({
        type: "keydown",
        listener: (event) => {
            if (event.code == "KeyJ" && event.altKey) {
                editOpen();
            }
        },
    });

    return (
        <ModalDialogCustom
            open={open}
            setOpen={editOpen}
            layout={"fullscreen"}
            head={
                <Stack
                    sx={{
                        width: "100%",
                    }}
                >
                    <Stack sx={{ mb: 2 }}>
                        <Typography level='h2'>{t("quests")}</Typography>
                    </Stack>
                </Stack>
            }
            minWidth='80%'
            sx={{
                maxHeight: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100%",
                }}
            >
                <Sheet
                    className='Sidebar'
                    sx={{
                        position: "sticky",
                        transition: "transform 0.4s, width 0.4s",
                        width: 200,
                        top: 0,
                        p: 2,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Box>
                        {quests.map((quest) => (
                            <Box
                                key={quest.id}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                <Link
                                    disabled={selectedQuest?.id === quest.id}
                                    onClick={() => {
                                        setSelectedQuest(quest);
                                    }}
                                >
                                    {quest.name}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                    <Box>
                        {completedQuests.length > 0 && <Typography level='h4'>{t("completed")}</Typography>}
                        {completedQuests.map((quest) => (
                            <Box
                                key={quest.id}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                <Link
                                    disabled={selectedQuest?.id === quest.id}
                                    onClick={() => {
                                        setSelectedQuest(quest);
                                    }}
                                >
                                    {quest.name}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Sheet>
                <Sheet
                    component='main'
                    className='MainContent'
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                        gap: 1,
                        overflow: "auto",
                        p: 5,
                    }}
                >
                    <Stack spacing={1}>
                        {selectedQuest?.questImage && (
                            <AspectRatio maxHeight={"10dvh"} objectFit='cover'>
                                <img src={selectedQuest.questImage} />
                            </AspectRatio>
                        )}
                        <Typography level='h2' textAlign={"center"}>
                            {selectedQuest?.name}
                        </Typography>
                        <Typography
                            maxHeight={"20dvh"}
                            textColor={"primary.500"}
                            sx={{
                                overflowY: "auto",
                            }}
                        >
                            {selectedQuest?.description}
                        </Typography>
                        <Divider />
                        <Typography
                            maxHeight={"20dvh"}
                            sx={{
                                overflowY: "auto",
                            }}
                        >
                            {selectedQuest?.currentStage?.description}
                        </Typography>
                    </Stack>
                </Sheet>
            </Box>
        </ModalDialogCustom>
    );
}
