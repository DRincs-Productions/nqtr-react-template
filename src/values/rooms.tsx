import { saveRoom } from "@drincs/nqtr";
import ImageTimeSlots from "../models/ImageTimeSlots";
import Room from "../models/nqtr/Room";
import { nap } from "./activity";
import { gym, mcHome, school } from "./locations";

export const mcRoom = new Room("mc_room", mcHome, {
    name: "MC room",
    image: new ImageTimeSlots({
        morning: "location_myroom-0",
        afternoon: "location_myroom-1",
        evening: "location_myroom-2",
        night: "location_myroom-3",
    }),
    activities: [nap],
});

export const aliceRoom = new Room("alice_room", mcHome, {
    name: "Alice room",
    image: new ImageTimeSlots({
        morning:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-0.webp",
        afternoon:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-1.webp",
        evening:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-2.webp",
        night: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-3.webp",
    }),
});

export const annRoom = new Room("ann_room", mcHome, {
    name: "Ann room",
    image: new ImageTimeSlots({
        morning:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-0.webp",
        afternoon:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-1.webp",
        evening:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-2.webp",
        night: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-3.webp",
    }),
});

const bathroom = new Room("bathroom", mcHome, {
    name: "Bathroom",
    image: new ImageTimeSlots(
        "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/bathroom.webp"
    ),
});

export const lounge = new Room("lounge", mcHome, {
    name: "Lounge",
    image: new ImageTimeSlots({
        morning:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-0.webp",
        afternoon:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-1.webp",
        evening:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-2.webp",
        night: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-3.webp",
    }),
});

export const terrace = new Room("terrace", mcHome, {
    name: "Terrace",
    isEntrance: true,
    image: new ImageTimeSlots({
        morning:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-0.webp",
        afternoon:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-1.webp",
        evening:
            "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-2.webp",
        night: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-3.webp",
    }),
});

export const gymRoom = new Room("gym_room", gym, {
    name: "Gym",
    image: new ImageTimeSlots(
        "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/gym.webp"
    ),
});

export const classRoom = new Room("class_room", school, {
    name: "School",
    image: new ImageTimeSlots(""),
});

saveRoom([mcRoom, aliceRoom, annRoom, bathroom, lounge, terrace, gymRoom, classRoom]);
