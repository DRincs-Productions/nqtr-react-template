import { MapStoredClass } from "@drincs/nqtr";
import ActivityBaseInterface from "@drincs/nqtr/dist/interface/ActivityInterface";
import { MyMapInterface } from "../../nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Map extends MapStoredClass implements MyMapInterface {
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
    name: string;
    image: ImageTimeSlots;
}
