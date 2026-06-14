// מחשב את משך הפגישה ומחזיר מחרוזת קריאה בעברית.
export function formatDuration(startTime: string, endTime: string): string {
    const totalMinutes = Math.max(
        0,
        Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000)
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) return `${hours} שע' ${minutes} דק'`;
    if (hours > 0) return `${hours} שעות`;
    return `${minutes} דקות`;
}
