import { CANVAS_UI_LAYER_NAME, INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentMap } from "@/lib/query/map-query";
import { useQueryCurrentRoom } from "@/lib/query/room-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { navigator, questsNotebook, routine, timeTracker, type OnRunProps } from "@drincs/nqtr";
import { canvas, storage } from "@drincs/pixi-vn";
import { Container, Rectangle } from "@drincs/pixi-vn/pixi.js";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function useMapLayerSync() {
    const { data: { map, background, locations } = {} } = useQueryCurrentMap();

    useEffect(() => {
        const layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
        if (!layer || !background) return;

        const screenWidth = 1920;
        const screenHeight = 1080;
        const maxZoom = 3;

        const viewport = new Container({
            eventMode: "static",
            interactiveChildren: true,
            hitArea: new Rectangle(0, 0, screenWidth, screenHeight),
            cursor: "grab",
        });
        const mapContainer = new Container({
            eventMode: "passive",
            interactiveChildren: true,
        });

        mapContainer.addChild(background);
        locations?.forEach((location) => {
            mapContainer.addChild(location);
        });
        viewport.addChild(mapContainer);
        layer.addChild(viewport);

        const mapWidth = background.width || screenWidth;
        const mapHeight = background.height || screenHeight;
        const fitScale = Math.min(screenWidth / mapWidth, screenHeight / mapHeight);
        const minZoom = Math.min(1, fitScale);
        let zoom = minZoom;
        let dragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let mapStartX = 0;
        let mapStartY = 0;

        const clampPosition = (x: number, y: number, scale: number) => {
            const scaledWidth = mapWidth * scale;
            const scaledHeight = mapHeight * scale;

            const clampedX =
                scaledWidth <= screenWidth
                    ? (screenWidth - scaledWidth) / 2
                    : Math.min(0, Math.max(screenWidth - scaledWidth, x));
            const clampedY =
                scaledHeight <= screenHeight
                    ? (screenHeight - scaledHeight) / 2
                    : Math.min(0, Math.max(screenHeight - scaledHeight, y));

            return { x: clampedX, y: clampedY };
        };

        const updateTransform = (scale: number, x = mapContainer.x, y = mapContainer.y) => {
            const clamped = clampPosition(x, y, scale);
            mapContainer.scale.set(scale);
            mapContainer.position.set(clamped.x, clamped.y);
            zoom = scale;
        };

        updateTransform(minZoom);

        const onWheel = (event: WheelEvent) => {
            if (event.deltaY === 0) return;
            event.preventDefault();

            const point = viewport.toLocal({
                x: event.offsetX,
                y: event.offsetY,
            });
            const worldX = (point.x - mapContainer.x) / zoom;
            const worldY = (point.y - mapContainer.y) / zoom;
            const nextZoom = Math.min(maxZoom, Math.max(minZoom, zoom * (event.deltaY < 0 ? 1.1 : 0.9)));
            const nextX = point.x - worldX * nextZoom;
            const nextY = point.y - worldY * nextZoom;

            updateTransform(nextZoom, nextX, nextY);
        };

        const onPointerDown = (event: PointerEvent) => {
            dragging = true;
            dragStartX = event.clientX;
            dragStartY = event.clientY;
            mapStartX = mapContainer.x;
            mapStartY = mapContainer.y;
            viewport.cursor = "grabbing";
        };

        const onPointerMove = (event: PointerEvent) => {
            if (!dragging) return;
            const deltaX = event.clientX - dragStartX;
            const deltaY = event.clientY - dragStartY;
            updateTransform(zoom, mapStartX + deltaX, mapStartY + deltaY);
        };

        const onPointerUp = () => {
            dragging = false;
            viewport.cursor = "grab";
        };

        const domElement = layer.parent?.parent?.canvas as HTMLCanvasElement | undefined;
        domElement?.addEventListener("wheel", onWheel, { passive: false });
        domElement?.addEventListener("pointerdown", onPointerDown);
        domElement?.addEventListener("pointermove", onPointerMove);
        domElement?.addEventListener("pointerup", onPointerUp);
        domElement?.addEventListener("pointerleave", onPointerUp);

        return () => {
            domElement?.removeEventListener("wheel", onWheel);
            domElement?.removeEventListener("pointerdown", onPointerDown);
            domElement?.removeEventListener("pointermove", onPointerMove);
            domElement?.removeEventListener("pointerup", onPointerUp);
            domElement?.removeEventListener("pointerleave", onPointerUp);
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [map?.id, background, locations]);

    return null;
}

export function useRoomLayerSync() {
    const {
        data: {
            room: { automaticFunctions = [], id } = {},
            background,
            activities,
            routine: routineIcons,
        } = {},
    } = useQueryCurrentRoom();
    const gameProps = useGameProps();
    const autoRunning = useRef(false);

    useEffect(() => {
        if (!id || id !== navigator.currentRoomId) return;

        const layer = canvas.getLayer(CANVAS_UI_LAYER_NAME);
        if (layer) {
            if (background) layer.addChild(background);

            activities?.forEach((icon) => {
                layer.addChild(icon);
            });
            routineIcons?.forEach((icon) => {
                layer.addChild(icon);
            });
        }

        if (automaticFunctions.length > 0 && !autoRunning.current) {
            autoRunning.current = true;
            const automaticFunction = automaticFunctions[0];
            GameStatus.setLoading(true);
            automaticFunction(gameProps).finally(() => {
                GameStatus.setLoading(false);
                autoRunning.current = false;
            });
        }

        return () => {
            canvas.getLayer(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [id, background, automaticFunctions, gameProps, activities, routineIcons]);

    return null;
}

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";
export default function useTimeTracker() {
    const { t } = useTranslation(["ui"]);
    const queryClient = useQueryClient();

    const sleep = useCallback(
        (newDayHour: number, props: OnRunProps) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                toast(t("cant_sleep_now"));
                return false;
            }
            timeTracker.increaseDate(1, newDayHour);
            routine.clearExpiredRoutine();
            navigator.clearExpiredActivities();
            questsNotebook.startsStageMustBeStarted(props);
            return true;
        },
        [t],
    );

    const wait = useCallback(
        (timeSpent: number) => {
            if (storage.getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                toast(t("cant_sleep_now"));
                return false;
            }
            if (timeTracker.currentTime + timeSpent >= 23 || timeTracker.currentTime < 5) {
                toast(t("cant_wait_now"));
                return false;
            }
            timeTracker.increaseTime(timeSpent);
            queryClient.invalidateQueries({
                queryKey: [INTERFACE_DATA_USE_QUERY_KEY],
            });
            return true;
        },
        [t, queryClient],
    );

    return {
        sleep,
        wait,
    };
}
