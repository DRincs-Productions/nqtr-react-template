import { ActivityInterface, MapInterface, MapStoredClass } from "@drincs/nqtr";
import ImageTimeSlots from "../ImageTimeSlots";

export default class Map extends MapStoredClass implements MapInterface {
    constructor(
        id: string,
        props: {
            activities?: ActivityInterface[];
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
