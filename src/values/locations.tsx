import { navigator, RegisteredLocations } from "@drincs/nqtr";
import { ImageSprite } from "@drincs/pixi-vn";
import Location from "../models/nqtr/Location";
import { mainMap } from "./maps";

export const mcHome = new Location("mc_home", mainMap, {
    name: "MC Home",
    icon: (location) => {
        const icon = new ImageSprite({ xAlign: 0.3, yAlign: 0.2 }, "icon map home");
        icon.on("click", () => {
            const entrance = location.entrance;
            if (entrance) {
                navigator.currentRoom = entrance;
            }
        });
        icon.load();
        return icon;
    },
});

export const gym = new Location("gym", mainMap, {
    name: "Gym",
    icon: (location) => {
        const icon = new ImageSprite({ xAlign: 0.5, yAlign: 0.3 }, "icon map gym");
        icon.on("click", () => {
            const entrance = location.entrance;
            if (entrance) {
                navigator.currentRoom = entrance;
            }
        });
        icon.load();
        return icon;
    },
});

export const school = new Location("school", mainMap, {
    name: "School",
    icon: () => new ImageSprite(),
});

RegisteredLocations.add([mcHome, gym, school]);
