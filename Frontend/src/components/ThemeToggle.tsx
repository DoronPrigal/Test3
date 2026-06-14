interface ThemeToggleProps {
    theme: "light" | "dark";
    onToggle: () => void;
}

// כפתור החלפת מצב תצוגה בין בהיר לכהה.
function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
    return (
        <button className="theme-button" onClick={onToggle} type="button">
            {theme === "light" ? "מצב כהה" : "מצב בהיר"}
        </button>
    );
}

export default ThemeToggle;