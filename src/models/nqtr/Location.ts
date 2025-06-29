import { ActivityInterface, LocationInterface, LocationStoredClass, MapInterface, RoomInterface } from "@drincs/nqtr";
import { ImageSprite, StepLabelProps } from "@drincs/pixi-vn";

export default class Location extends LocationStoredClass implements LocationInterface {
    constructor(
        id: string,
        map: MapInterface,
        props: {
            activities?: ActivityInterface[];
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            icon: ImageSprite | ((location: Location, props: StepLabelProps) => ImageSprite);
        }
    ) {
        super(id, map, props.activities);
        this.name = props.name;
        this._defaultdisabled = props.disabled || false;
        this._defaulthidden = props.hidden || false;
        this._icon = props.icon;
    }
    readonly name: string;
    private readonly _icon: ImageSprite | ((location: Location, props: StepLabelProps) => ImageSprite);
    getIcon(props: StepLabelProps): ImageSprite {
        if (typeof this._icon === "function") {
            return this._icon(this, props);
        }
        return this._icon;
    }
    private _defaultdisabled: boolean | (() => boolean) = false;
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean>("disabled") || this._defaultdisabled;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set disabled(value: boolean) {
        this.setStorageProperty("disabled", value);
    }
    private _defaulthidden: boolean | (() => boolean) = false;
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean>("hidden") || this._defaulthidden;
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
