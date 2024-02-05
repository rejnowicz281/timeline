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
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
