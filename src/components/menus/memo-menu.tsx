import { useQueryQuests, useQuerySelectedQuest } from "@/lib/query/quest-query";
import { Memo } from "@/lib/stores/memo-store";
import { getPixiJSAsset } from "@/lib/utils/assets-utility";
import { AspectRatio, Box, Divider, Link, Sheet, Stack, Typography } from "@mui/joy";
import { useSelector } from "@tanstack/react-store";
import { useTranslation } from "react-i18next";

export function MemoMenu() {
    const { t } = useTranslation(["ui"]);
    const {
        data: { inProgressQuests, completedQuests, failedQuests } = {
            inProgressQuests: [],
            completedQuests: [],
            failedQuests: [],
        },
    } = useQueryQuests();
    const { data: selectedQuest } = useQuerySelectedQuest();
    const image = selectedQuest?.questImage ? getPixiJSAsset(selectedQuest.questImage) : undefined;
    const open = useSelector(Memo.store, (state) => state.open);

    useEventListener({
        type: "keydown",
        listener: (event) => {
            if (event.code === "KeyJ" && event.altKey) {
                Memo.toggleOpen();
            }
        },
    });

    return (
        <ModalDialogCustom
            open={open}
            setOpen={Memo.toggleOpen}
            layout={"fullscreen"}
            head={
                <Stack
                    sx={{
                        width: "100%",
                    }}
                >
                    <Stack sx={{ mb: 2 }}>
                        <Typography level="h2">{t("quests")}</Typography>
                    </Stack>
                </Stack>
            }
            minWidth="80%"
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
                    className="Sidebar"
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
                        {inProgressQuests.map((quest) => (
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
                                        Memo.setSelectedQuestId(quest.id);
                                    }}
                                >
                                    {quest.name}
                                </Link>
                            </Box>
                        ))}
                        {completedQuests.length > 0 && (
                            <Typography level="h4">{t("completed")}</Typography>
                        )}
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
                                        Memo.setSelectedQuestId(quest.id);
                                    }}
                                >
                                    {quest.name}
                                </Link>
                            </Box>
                        ))}
                        {failedQuests.length > 0 && (
                            <Typography level="h4">{t("failed")}</Typography>
                        )}
                        {failedQuests.map((quest) => (
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
                                        Memo.setSelectedQuestId(quest.id);
                                    }}
                                >
                                    {quest.name}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Sheet>
                <Sheet
                    component="main"
                    className="MainContent"
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
                        {image && (
                            <AspectRatio maxHeight={"10dvh"} objectFit="cover">
                                <img src={image} />
                            </AspectRatio>
                        )}
                        <Typography level="h2" textAlign={"center"}>
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
