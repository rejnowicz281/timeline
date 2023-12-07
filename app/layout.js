import "./globals.css";

export const metadata = {
    title: "Timeline",
    description: "A Github Timeline",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
