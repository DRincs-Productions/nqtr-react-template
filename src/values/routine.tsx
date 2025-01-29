import { routine, saveCommitment } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { aliceTalkMenuLabel, talkSleepLabel } from "../labels/variousActionsLabels";
import ImageTimeSlots from "../models/ImageTimeSlots";
import Commitment from "../models/nqtr/Commitment";
import { alice } from "./characters";
import { aliceRoom, classRoom, terrace } from "./rooms";

const aliceSleep = new Commitment("alice_sleep", alice, aliceRoom, {
    priority: 1,
    fromHour: 20,
    toHour: 10,
    image: new ImageTimeSlots(
        "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/roomsleep0A.webp"
    ),
    icon: (commitment, props) => {
        return (
            <NavigationRoundIconButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
            >
                <QuestionAnswerIcon
                    sx={{
                        fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                    }}
                />
            </NavigationRoundIconButton>
        );
    },
    onRun: (_, event) => {
        event.navigate("/game");
        narration.jumpLabel(talkSleepLabel, event);
    },
});

const aliceGoSchool = new Commitment("alice_go_school", alice, classRoom, {
    fromHour: 8,
    toHour: 14,
    hidden: "weekend",
    priority: 2,
});

const aliceSmokes = new Commitment("alice_smokes", alice, terrace, {
    fromHour: 10,
    toHour: 20,
    image: new ImageTimeSlots(
        "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0A.webp"
    ),
    icon: (commitment, props) => {
        return (
            <NavigationRoundIconButton
                disabled={commitment.disabled}
                onClick={() => {
                    if (commitment.run) {
                        commitment.run(props);
                    }
                }}
                ariaLabel={commitment.name}
            >
                <QuestionAnswerIcon
                    sx={{
                        fontSize: { sx: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" },
                    }}
                />
            </NavigationRoundIconButton>
        );
    },
    onRun: (_, event) => {
        event.navigate("/game");
        narration.jumpLabel(aliceTalkMenuLabel, event);
    },
});

saveCommitment([aliceSleep, aliceGoSchool, aliceSmokes]);

routine.fixedRoutine = [aliceSleep, aliceGoSchool, aliceSmokes];
