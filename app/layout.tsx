import React, { ReactNode } from "react";
import "@styles/global.css"
import Provider from "@components/Provider";
import Nav from "@components/Nav";
interface LayoutProps {
    children: ReactNode;
}

export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}
const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return <html lang="en">
        <body>
            <div className="main">
                <div className="gradient" />
            </div>
            <main className="app">
                <Nav />
                {children}
            </main>
        </body>
    </html>;
};

export default RootLayout;