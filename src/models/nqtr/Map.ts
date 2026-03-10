import { ActivityInterface, LocationInterface, MapInterface, MapStoredClass, OnRunProps } from "@drincs/nqtr";
import { NeighboringMaps } from "../../nqtr";
import { PixiUIParam, PixiUIProp } from "./ui-elements";

export default class Map extends MapStoredClass implements MapInterface {
    constructor(
        id: string,
        props: {
            activities?: ActivityInterface[];
            name: string;
            background: PixiUIParam<Map>;
            neighboringMaps: NeighboringMaps;
        },
    ) {
        super(id, props.activities);
        this.name = props.name;
        this._background = props.background;
        this.neighboringMaps = props.neighboringMaps;
    }
    readonly name: string;
    private readonly _background: PixiUIParam<Map>;
    get background(): PixiUIProp {
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
