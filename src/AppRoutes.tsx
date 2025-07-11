import { Route, Routes } from "react-router-dom";
import NextButton from "./components/NextButton";
import VisibilityButton from "./components/VisibilityButton";
import { LOADING_ROUTE, MAIN_MENU_ROUTE, MAP_ROUTE, NARRATION_ROUTE, NAVIGATION_ROUTE } from "./constans";
import useNQTRDetector from "./hooks/useNQTRDetector";
import useSkipAutoDetector from "./hooks/useSkipAutoDetector";
import HistoryScreen from "./screens/HistoryScreen";
import LoadingScreen from "./screens/LoadingScreen";
import MainMenu from "./screens/MainMenu";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";
import MapScreen from "./screens/nqtr/MapScreen";
import MemoScreen from "./screens/nqtr/MemoScreen";
import NqtrQuickTools from "./screens/nqtr/NqtrQuickTools";
import QuickActivities from "./screens/nqtr/QuickActivities";
import QuickRooms from "./screens/nqtr/QuickRooms";
import TimeScreen from "./screens/nqtr/TimeScreen";
import QuickTools from "./screens/QuickTools";

export default function AppRoutes() {
    return (
        <Routes>
            <Route key={"main_menu"} path={MAIN_MENU_ROUTE} element={<MainMenu />} />
            <Route key={"loading"} path={LOADING_ROUTE} element={<LoadingScreen />} />
            <Route key={"narration"} path={NARRATION_ROUTE} element={<NarrationElement />} />
            <Route key={"navigation"} path={NAVIGATION_ROUTE} element={<NavigationElement />} />
            <Route key={"map"} path={MAP_ROUTE} element={<MapScreen />} />
            <Route path='*' element={<MainMenu />} />
        </Routes>
    );
}

function NarrationElement() {
    return (
        <>
            <HistoryScreen />
            <NarrationScreen />
            <QuickTools />
            <TextInput />
            <NextButton />
            <NarrationDetectors />
            <VisibilityButton />
        </>
    );
}

function NavigationElement() {
    NavigationDetectors();
    return (
        <>
            <HistoryScreen />
            <MemoScreen />
            <QuickActivities />
            <QuickRooms />
            <TimeScreen />
            <NqtrQuickTools />
            <VisibilityButton />
        </>
    );
}

function NarrationDetectors() {
    useSkipAutoDetector();
    return <></>;
}

function NavigationDetectors() {
    useNQTRDetector();
    return <></>;
}
