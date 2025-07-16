import { RegisteredMaps } from "@drincs/nqtr";
import TimeSlotsImage from "../models/TimeSlotsImage";
import Map from "../models/nqtr/Map";

export const mainMap = new Map("main_map", {
    name: "Main Map",
    image: new TimeSlotsImage({
        morning: "map-0",
        afternoon: "map-1",
        evening: "map-2",
        night: "map-3",
    }),
    neighboringMaps: {
        north: "nightcity_map",
    },
});

export const nightcityMap = new Map("nightcity_map", {
    name: "Nightcity",
    image: new TimeSlotsImage("map-nightcity"),
    neighboringMaps: {
        south: "main_map",
    },
});

RegisteredMaps.add([mainMap, nightcityMap]);
