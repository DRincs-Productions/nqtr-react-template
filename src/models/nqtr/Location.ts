import {
    ActivityInterface,
    LocationInterface,
    LocationStoredClass,
    MapInterface,
    OnRunProps,
    RoomInterface,
} from "@drincs/nqtr";
import { ContainerChild } from "@drincs/pixi-vn";

export default class Location extends LocationStoredClass implements LocationInterface {
    constructor(
        id: string,
        map: MapInterface,
        props: {
            activities?: ActivityInterface[];
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            sprite: ContainerChild | ((props: Location, runProps: OnRunProps) => ContainerChild);
        }
    ) {
        super(id, map, props.activities);
        this.name = props.name;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
        this._sprite = props.sprite;
    }
    readonly name: string;
    private readonly _sprite: ContainerChild | ((props: Location, runProps: OnRunProps) => ContainerChild);
    get sprite(): ContainerChild | ((props: OnRunProps) => ContainerChild) {
        let sprite = this._sprite;
        if (typeof sprite === "function") {
            return (runProps: OnRunProps) => sprite(this, runProps);
        }
        return sprite;
    }
    private _defaultDisabled: boolean | (() => boolean) = false;
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean>("disabled") || this._defaultDisabled;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set disabled(value: boolean) {
        this.setStorageProperty("disabled", value);
    }
    private _defaultHidden: boolean | (() => boolean) = false;
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean>("hidden") || this._defaultHidden;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set hidden(value: boolean) {
        this.setStorageProperty("hidden", value);
    }
    override get rooms(): RoomInterface[] {
        return super.rooms.filter((room) => !room.hidden);
    }
    get entrance(): RoomInterface | undefined {
        if (super.rooms.length === 0) {
            return undefined;
        }
        return super.rooms.find((room) => room.isEntrance) || super.rooms[0];
    }
}
