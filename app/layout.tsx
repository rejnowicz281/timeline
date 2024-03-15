import ThemeButton from "@/components/general/theme-button";
import { ThemeProvider } from "@/providers/theme-provider";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
    title: "Timeline",
    description: "A Github Timeline",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html className="h-full" lang="en">
            <body className={clsx("min-h-full flex flex-col", GeistSans.className)}>
                <NextTopLoader height={4} showSpinner={false} />
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <ThemeButton />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
