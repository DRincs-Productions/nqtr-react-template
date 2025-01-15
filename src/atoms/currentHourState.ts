import { timeTracker } from "@drincs/nqtr";
import { atom } from "recoil";

export const currentHourState = atom<number>({
    key: 'currentHourState',
    default: timeTracker.currentHour,
});
