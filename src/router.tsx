import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainHeader from "./components/main-header";
import HomePage from "./pages/home";
import TimelinePage from "./pages/timeline";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <>
                            <MainHeader />
                            <Outlet />
                        </>
                    }
                >
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:username" element={<TimelinePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
