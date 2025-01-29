import Location from "../models/nqtr/Location";
import { mainMap } from "./maps";

export const mcHome = new Location("mc_home", mainMap, {
    name: "MC Home",
    // icon: new CanvasImage({
    //     x: 100,
    //     y: 100,
    //     texture: Texture.EMPTY,
    // }, "https://cdn-icons-png.freepik.com/512/5426/5426899.png?ga=GA1.1.2068448463.1715274700")
});

export const gym = new Location("gym", mainMap, {
    name: "MC Home",
});

export const school = new Location("school", mainMap, {
    name: "School",
});
