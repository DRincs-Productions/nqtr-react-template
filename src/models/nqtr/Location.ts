import { ActivityInterface, LocationInterface, LocationStoredClass, MapInterface, RoomInterface } from "@drincs/nqtr";
import { ContainerChild, StepLabelProps } from "@drincs/pixi-vn";

export default class Location extends LocationStoredClass implements LocationInterface {
    constructor(
        id: string,
        map: MapInterface,
        props: {
            activities?: ActivityInterface[];
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            icon: ContainerChild | ((location: Location, props: StepLabelProps) => ContainerChild);
        }
    ) {
        super(id, map, props.activities);
        this.name = props.name;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
        this._icon = props.icon;
    }
    readonly name: string;
    private readonly _icon: ContainerChild | ((location: Location, props: StepLabelProps) => ContainerChild);
    getIcon(props: StepLabelProps): ContainerChild {
        if (typeof this._icon === "function") {
            return this._icon(this, props);
        }
        return this._icon;
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
