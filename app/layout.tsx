import { Metadata } from "next";
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
            <body className="min-h-full flex flex-col bg-zinc-850 text-white text-xl">{children}</body>
        </html>
    );
};

export default RootLayout;
