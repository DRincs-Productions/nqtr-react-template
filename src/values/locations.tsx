import { navigator, RegisteredLocations } from "@drincs/nqtr";
import { ImageSprite } from "@drincs/pixi-vn";
import { NAVIGATION_ROUTE } from "../constans";
import Location from "../models/nqtr/Location";
import { mainMap } from "./maps";

export const mcHome = new Location("mc_home", mainMap, {
    name: "MC Home",
    sprite: (location, { navigate }) => {
        const icon = new ImageSprite(
            { xAlign: 0.3, yAlign: 0.2, height: 120, width: 120, eventMode: "static", cursor: "pointer" },
            "icon_location_home"
        );
        icon.on("pointerdown", () => {
            const entrance = location.entrance;
            if (entrance) {
                navigator.currentRoom = entrance;
                navigate(NAVIGATION_ROUTE);
            }
        });
        icon.load();
        return icon;
    },
});

export const gym = new Location("gym", mainMap, {
    name: "Gym",
    sprite: (location, { navigate }) => {
        const icon = new ImageSprite(
            { xAlign: 0.5, yAlign: 0.3, height: 120, width: 120, eventMode: "static", cursor: "pointer" },
            "icon_location_gym"
        );
        icon.on("pointerdown", () => {
            const entrance = location.entrance;
            if (entrance) {
                navigator.currentRoom = entrance;
                navigate(NAVIGATION_ROUTE);
            }
        });
        icon.load();
        return icon;
    },
});

export const school = new Location("school", mainMap, {
    name: "School",
    sprite: () => new ImageSprite(),
});

RegisteredLocations.add([mcHome, gym, school]);
