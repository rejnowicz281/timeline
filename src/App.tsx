import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeButton from "./components/general/theme-button";
import { LoadingBarProvider } from "./providers/loading-bar-provider";
import { ThemeProvider } from "./providers/theme-provider";
import AppRouter from "./router";

const queryClient = new QueryClient();

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <LoadingBarProvider>
                <ThemeButton />
                <QueryClientProvider client={queryClient}>
                    <AppRouter />
                </QueryClientProvider>
            </LoadingBarProvider>
        </ThemeProvider>
    );
}
