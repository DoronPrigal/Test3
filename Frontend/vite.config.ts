import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// הגדרת Vite עבור פרויקט React.
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
    },
});