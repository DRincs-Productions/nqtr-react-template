import { RegisteredCommitments, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NqtrRoundIconButton from "../components/NqtrRoundIconButton";
import { NARRATION_ROUTE } from "../constans";
import { TALK_SLEEP_LABEL_KEY } from "../labels/variousActionsLabelKeys";
import { aliceTalkMenuLabel } from "../labels/variousActionsLabels";
import Commitment from "../models/nqtr/Commitment";
import { alice } from "./characters";

export const aliceSleep = new Commitment("alice_sleep", alice, {
    priority: 1,
    timeSlot: {
        from: 20,
        to: 10,
    },
    background: "alice_roomsleep0A",
    icon: (commitment, props) => {
        return (
            <NqtrRoundIconButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
                variant='solid'
                color='primary'
            >
                <QuestionAnswerIcon
                    sx={{
                        fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                    }}
                />
            </NqtrRoundIconButton>
        );
    },
    onRun: (_, event) => {
        event.navigate(NARRATION_ROUTE);
        narration.jump(TALK_SLEEP_LABEL_KEY, event);
    },
});

export const aliceGoSchool = new Commitment("alice_go_school", alice, {
    timeSlot: {
        from: 8,
        to: 14,
    },
    hidden: () => timeTracker.isWeekend,
    priority: 2,
});

export const aliceSmokes = new Commitment("alice_smokes", alice, {
    timeSlot: {
        from: 10,
        to: 20,
    },
    background: "alice_terrace0A",
    icon: (commitment, props) => {
        return (
            <NqtrRoundIconButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
                variant='solid'
                color='primary'
            >
                <QuestionAnswerIcon
                    sx={{
                        fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                    }}
                />
            </NqtrRoundIconButton>
        );
    },
    onRun: (_, event) => {
        event.navigate(NARRATION_ROUTE);
        narration.jump(aliceTalkMenuLabel, event);
    },
});

RegisteredCommitments.add([aliceSleep, aliceGoSchool, aliceSmokes]);
