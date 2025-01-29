import Map from "../models/nqtr/Map";

export const mainMap = new Map("main_map", {
    neighboringMaps: {
        // "north": nightcityMap,
    },
});

export const nightcityMap = new Map("nightcity_map", {
    neighboringMaps: {
        // "south": mainMap,
    },
});
