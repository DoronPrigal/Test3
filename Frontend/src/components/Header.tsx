import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
    theme: "light" | "dark";
    onToggleTheme: () => void;
}

// כותרת עליונה עם ניווט ראשי וכפתור החלפת ערכת נושא.
function Header({ theme, onToggleTheme }: HeaderProps) {
    return (
        <>
            <header className="site-header">
                <div>
                    <p className="eyebrow">מערכת ניהול פגישות</p>
                    <h1>פגישות לקבוצות פיתוח</h1>
                    <p className="hero-subtitle">ניהול פשוט, ברור ורספונסיבי של פגישות צוות בחברת הייטק.</p>
                </div>

                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </header>

            <nav className="site-nav">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>בית</NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>אודות</NavLink>
                <NavLink to="/meetings" end className={({ isActive }) => (isActive ? "active-link" : "")}>פגישות</NavLink>
                <NavLink to="/meetings/new" className={({ isActive }) => (isActive ? "active-link" : "")}>הוספת פגישה</NavLink>
            </nav>
        </>
    );
}

export default Header;