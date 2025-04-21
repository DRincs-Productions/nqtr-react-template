import { saveCommitment, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NqtrRoundIconButton from "../components/NqtrRoundIconButton";
import { NARRATION_ROUTE } from "../constans";
import { aliceTalkMenuLabel, talkSleepLabel } from "../labels/variousActionsLabels";
import ImageTimeSlots from "../models/ImageTimeSlots";
import Commitment from "../models/nqtr/Commitment";
import { alice } from "./characters";
import { aliceRoom, classRoom, terrace } from "./rooms";

const aliceSleep = new Commitment("alice_sleep", alice, aliceRoom, {
    priority: 1,
    fromHour: 20,
    toHour: 10,
    image: new ImageTimeSlots("alice_roomsleep0A"),
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
        narration.jumpLabel(talkSleepLabel, event);
    },
});

const aliceGoSchool = new Commitment("alice_go_school", alice, classRoom, {
    fromHour: 8,
    toHour: 14,
    hidden: () => timeTracker.isWeekend,
    priority: 2,
});

const aliceSmokes = new Commitment("alice_smokes", alice, terrace, {
    fromHour: 10,
    toHour: 20,
    image: new ImageTimeSlots("alice_terrace0A"),
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
        narration.jumpLabel(aliceTalkMenuLabel, event);
    },
});

export const fixedRoutine = [aliceSleep, aliceGoSchool, aliceSmokes];

saveCommitment([...fixedRoutine]);
