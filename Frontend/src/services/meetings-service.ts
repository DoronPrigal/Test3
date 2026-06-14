import { fetchJson } from "./api";
import type { Meeting, MeetingPayload } from "../types";

// שליפת כל הפגישות של קבוצה מסוימת.
export async function getMeetingsByGroupId(groupId: number): Promise<Meeting[]> {
    return fetchJson<Meeting[]>(`/meetings/group/${groupId}`);
}

// שליפת פגישה אחת לפי מזהה.
export async function getMeetingById(meetingId: number): Promise<Meeting> {
    return fetchJson<Meeting>(`/meetings/${meetingId}`);
}

// הוספת פגישה חדשה.
export async function createMeeting(payload: MeetingPayload): Promise<{ meeting_id: number }> {
    return fetchJson<{ meeting_id: number }>("/meetings", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

// עדכון פגישה קיימת.
export async function updateMeeting(meetingId: number, payload: MeetingPayload): Promise<{ message: string }> {
    return fetchJson<{ message: string }>(`/meetings/${meetingId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
}

// מחיקת פגישה קיימת.
export async function deleteMeeting(meetingId: number): Promise<{ message: string }> {
    return fetchJson<{ message: string }>(`/meetings/${meetingId}`, {
        method: "DELETE",
    });
}