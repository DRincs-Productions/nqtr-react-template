import { MapInterface, MapStoredClass } from "@drincs/nqtr";
import ActivityBaseInterface from "@drincs/nqtr/dist/interface/ActivityInterface";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Map extends MapStoredClass implements MapInterface {
    constructor(
        id: string,
        props: {
            activities?: ActivityBaseInterface[];
            name: string;
            image: ImageTimeSlots;
        }
    ) {
        super(id, props.activities);
        this.name = props.name;
        this.image = props.image;
    }
    readonly name: string;
    readonly image: ImageTimeSlots;
}
