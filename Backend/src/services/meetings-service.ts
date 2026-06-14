import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { Meeting, NewMeeting } from "../models/meeting-model";

export async function getMeetingsByGroupId(groupId: number): Promise<Meeting[]> {
    const [rows] = await db.query<(Meeting & RowDataPacket)[]>(
        `SELECT meeting_id, group_id, start_time, end_time, description, room
         FROM meetings
         WHERE group_id = ?
         ORDER BY start_time`,
        [groupId]
    );

    return rows;
}

export async function getMeetingById(meetingId: number): Promise<Meeting | undefined> {
    const [rows] = await db.query<(Meeting & RowDataPacket)[]>(
        `SELECT meeting_id, group_id, start_time, end_time, description, room
         FROM meetings
         WHERE meeting_id = ?`,
        [meetingId]
    );

    return rows[0];
}

export async function addMeeting(meeting: NewMeeting): Promise<number> {
    const [result] = await db.query<ResultSetHeader>(
        `INSERT INTO meetings (group_id, start_time, end_time, description, room)
         VALUES (?, ?, ?, ?, ?)`,
        [
            meeting.group_id,
            new Date(meeting.start_time),
            new Date(meeting.end_time),
            meeting.description,
            meeting.room,
        ]
    );

    return result.insertId;
}

export async function updateMeeting(meetingId: number, meeting: NewMeeting): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
        `UPDATE meetings
         SET group_id = ?, start_time = ?, end_time = ?, description = ?, room = ?
         WHERE meeting_id = ?`,
        [
            meeting.group_id,
            new Date(meeting.start_time),
            new Date(meeting.end_time),
            meeting.description,
            meeting.room,
            meetingId,
        ]
    );

    return result.affectedRows > 0;
}

export async function deleteMeeting(meetingId: number): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
        "DELETE FROM meetings WHERE meeting_id = ?",
        [meetingId]
    );

    return result.affectedRows > 0;
}