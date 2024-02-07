import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                zinc: {
                    "850": "#18171d",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "right-slide-in": {
                    "0%": { transform: "translateX(50vh)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "left-slide-in": {
                    "0%": { transform: "translateX(-50vh)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "right-slide-in": "right-slide-in 0.5s ease-in-out 1 forwards",
                "left-slide-in": "left-slide-in 0.5s ease-in-out 1 forwards",
                "fade-in": "fade-in 0.5s ease-in-out 1 forwards",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
