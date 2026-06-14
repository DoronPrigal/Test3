// ממיר מחרוזת ISO לפורמט datetime-local בשעון מקומי לשדות input בטופס.
export function toDatetimeLocal(isoString: string): string {
    if (!isoString) return "";
    const d = new Date(isoString);
    // מוסיר את הפרשת אזור הזמן המקומי כדי להציג שעון מקומי נכון.
    const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
}
