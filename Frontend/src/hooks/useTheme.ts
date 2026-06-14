import { useEffect, useState } from "react";

const themeStorageKey = "meetings-theme";

// הוק לניהול מצב תצוגה כהה או בהירה יחד עם שמירה ב-localStorage.
export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const savedTheme = localStorage.getItem(themeStorageKey);
        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(themeStorageKey, theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    }

    return { theme, toggleTheme };
}