import { ActivityInterface, LocationInterface, MapInterface, MapStoredClass, OnRunProps } from "@drincs/nqtr";
import { NeighboringMaps } from "../../nqtr";
import MultiTypeImage, { MultiTypeImageProp } from "../MultiTypeImage";

export default class Map extends MapStoredClass implements MapInterface {
    constructor(
        id: string,
        props: {
            activities?: ActivityInterface[];
            name: string;
            image: MultiTypeImageProp<Map>;
            neighboringMaps: NeighboringMaps;
        }
    ) {
        super(id, props.activities);
        this.name = props.name;
        this._image = props.image;
        this.neighboringMaps = props.neighboringMaps;
    }
    readonly name: string;
    private readonly _image: MultiTypeImageProp<Map>;
    get image(): MultiTypeImage {
        let image = this._image;
        if (typeof image === "function") {
            return (runProps: OnRunProps) => image(this, runProps);
        }
        return image;
    }
    readonly neighboringMaps: NeighboringMaps;
    override get locations(): LocationInterface[] {
        return super.locations.filter((location) => !location.hidden);
    }
}
