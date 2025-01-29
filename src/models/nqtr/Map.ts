import { ActivityInterface, LocationInterface, MapInterface, MapStoredClass } from "@drincs/nqtr";
import { NeighboringMaps } from "../../nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Map extends MapStoredClass implements MapInterface {
    constructor(
        id: string,
        props: {
            activities?: ActivityInterface[];
            name: string;
            image: ImageTimeSlots;
            neighboringMaps: NeighboringMaps;
        }
    ) {
        super(id, props.activities);
        this.name = props.name;
        this.image = props.image;
        this.neighboringMaps = props.neighboringMaps;
    }
    readonly name: string;
    readonly image: ImageTimeSlots;
    readonly neighboringMaps: NeighboringMaps;
    override get locations(): LocationInterface[] {
        return super.locations.filter((location) => !location.hidden);
    }
}
