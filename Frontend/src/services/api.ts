import type { ApiError } from "../types";

export const apiBaseUrl = "http://localhost:3000/api";

// פונקציה כללית לכל קריאות השרת עם טיפול אחיד בשגיאות.
export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers ?? {}),
        },
    });

    if (!response.ok) {
        let errorMessage = "אירעה שגיאה בבקשה לשרת";

        try {
            const errorData = (await response.json()) as ApiError;
            if (errorData.message) {
                errorMessage = errorData.message;
            }
        } catch {
            errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return (await response.json()) as T;
}