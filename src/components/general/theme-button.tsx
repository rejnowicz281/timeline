import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            className="z-20 fixed top-4 right-4"
            variant="outline"
            onClick={() => {
                if (theme === "light") setTheme("dark");
                else setTheme("light");
            }}
        >
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
}
