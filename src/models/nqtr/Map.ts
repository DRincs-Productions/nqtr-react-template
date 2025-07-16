import { ActivityInterface, LocationInterface, MapInterface, MapStoredClass, OnRunProps } from "@drincs/nqtr";
import { NeighboringMaps } from "../../nqtr";
import MultiTypeSprite, { MultiTypeSpriteProp } from "../MultiTypeSprite";

export default class Map extends MapStoredClass implements MapInterface {
    constructor(
        id: string,
        props: {
            activities?: ActivityInterface[];
            name: string;
            background: MultiTypeSpriteProp<Map>;
            neighboringMaps: NeighboringMaps;
        }
    ) {
        super(id, props.activities);
        this.name = props.name;
        this._background = props.background;
        this.neighboringMaps = props.neighboringMaps;
    }
    readonly name: string;
    private readonly _background: MultiTypeSpriteProp<Map>;
    get background(): MultiTypeSprite {
        const background = this._background;
        if (typeof background === "function") {
            return (runProps: OnRunProps) => background(this, runProps);
        }
        return background;
    }
    readonly neighboringMaps: NeighboringMaps;
    override get locations(): LocationInterface[] {
        return super.locations.filter((location) => !location.hidden);
    }
}
