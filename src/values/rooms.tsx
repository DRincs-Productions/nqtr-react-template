import { RegisteredRooms } from "@drincs/nqtr";
import TimeSlotsImage from "../models/TimeSlotsImage";
import Room from "../models/nqtr/Room";
import { bed } from "./activities";
import { gym, mcHome, school } from "./locations";

export const mcRoom = new Room("mc_room", mcHome, {
    name: "MC room",
    background: new TimeSlotsImage({
        morning: "location_myroom-0",
        afternoon: "location_myroom-1",
        evening: "location_myroom-2",
        night: "location_myroom-3",
    }),
    activities: [bed],
});

export const aliceRoom = new Room("alice_room", mcHome, {
    name: "Alice room",
    background: new TimeSlotsImage({
        morning: "location_aliceroom-0",
        afternoon: "location_aliceroom-1",
        evening: "location_aliceroom-2",
        night: "location_aliceroom-3",
    }),
});

export const annRoom = new Room("ann_room", mcHome, {
    name: "Ann room",
    background: new TimeSlotsImage({
        morning: "location_annroom-0",
        afternoon: "location_annroom-1",
        evening: "location_annroom-2",
        night: "location_annroom-3",
    }),
});

export const bathroom = new Room("bathroom", mcHome, {
    name: "Bathroom",
    background: "location_bathroom",
});

export const lounge = new Room("lounge", mcHome, {
    name: "Lounge",
    background: new TimeSlotsImage({
        morning: "location_lounge-0",
        afternoon: "location_lounge-1",
        evening: "location_lounge-2",
        night: "location_lounge-3",
    }),
});

export const terrace = new Room("terrace", mcHome, {
    name: "Terrace",
    isEntrance: true,
    background: new TimeSlotsImage({
        morning: "location_terrace-0",
        afternoon: "location_terrace-1",
        evening: "location_terrace-2",
        night: "location_terrace-3",
    }),
});

export const gymRoom = new Room("gym_room", gym, {
    name: "Gym",
    background: "location_gym",
});

export const classRoom = new Room("class_room", school, {
    name: "School",
    background: "",
});

RegisteredRooms.add([mcRoom, aliceRoom, annRoom, bathroom, lounge, terrace, gymRoom, classRoom]);
