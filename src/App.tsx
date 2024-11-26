import ThemeButton from "./components/general/theme-button";
import { ThemeProvider } from "./providers/theme-provider";
import AppRouter from "./router";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ThemeButton />
            <AppRouter />
        </ThemeProvider>
    );
}
