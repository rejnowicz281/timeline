import ThemeButton from "./components/general/theme-button";
import { LoadingBarProvider } from "./providers/loading-bar-provider";
import { ThemeProvider } from "./providers/theme-provider";
import AppRouter from "./router";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <LoadingBarProvider>
                <ThemeButton />
                <AppRouter />
            </LoadingBarProvider>
        </ThemeProvider>
    );
}
