import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
    theme: "light" | "dark";
    onToggleTheme: () => void;
    children: ReactNode;
}

// מעטפת כללית לכל הדפים באפליקציה.
function Layout({ theme, onToggleTheme, children }: LayoutProps) {
    return (
        <div className="app-shell" dir="rtl">
            <Header theme={theme} onToggleTheme={onToggleTheme} />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;