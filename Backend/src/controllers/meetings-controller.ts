import { Request, Response } from "express";
import {
    addMeeting,
    deleteMeeting,
    getMeetingById,
    getMeetingsByGroupId,
    updateMeeting,
} from "../services/meetings-service";
import { NewMeeting } from "../models/meeting-model";

function parsePositiveId(value: string | string[] | undefined): number | null {
    if (typeof value !== "string") {
        return null;
    }

    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
        return null;
    }

    return parsedValue;
}

function extractMeetingFromBody(body: NewMeeting): NewMeeting {
    return {
        group_id: Number(body.group_id),
        start_time: body.start_time,
        end_time: body.end_time,
        description: body.description,
        room: body.room,
    };
}

function validateMeeting(meeting: NewMeeting, allowPastStartTime: boolean): string | null {
    const hasRequiredFields =
        Number.isFinite(meeting.group_id) &&
        meeting.group_id > 0 &&
        typeof meeting.start_time === "string" &&
        meeting.start_time.trim() !== "" &&
        typeof meeting.end_time === "string" &&
        meeting.end_time.trim() !== "" &&
        typeof meeting.description === "string" &&
        meeting.description.trim() !== "" &&
        typeof meeting.room === "string" &&
        meeting.room.trim() !== "";

    if (!hasRequiredFields) {
        return "All fields are required";
    }

    const startTime = new Date(meeting.start_time);
    const endTime = new Date(meeting.end_time);

    if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime())) {
        return "Start time and end time must be valid dates";
    }

    if (!allowPastStartTime && startTime.getTime() < Date.now()) {
        return "Start time cannot be in the past";
    }

    if (startTime.getTime() >= endTime.getTime()) {
        return "Start time must be earlier than end time";
    }

    return null;
}

export async function getMeetingsByGroup(req: Request, res: Response): Promise<void> {
    try {
        const groupId = parsePositiveId(req.params.groupId);

        if (groupId === null) {
            res.status(400).json({ message: "groupId must be a positive integer" });
            return;
        }

        const meetings = await getMeetingsByGroupId(groupId);
        res.json(meetings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch meetings" });
    }
}

export async function getMeeting(req: Request, res: Response): Promise<void> {
    try {
        const meetingId = parsePositiveId(req.params.meetingId);

        if (meetingId === null) {
            res.status(400).json({ message: "meetingId must be a positive integer" });
            return;
        }

        const meeting = await getMeetingById(meetingId);

        if (!meeting) {
            res.status(404).json({ message: "Meeting not found" });
            return;
        }

        res.json(meeting);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch meeting" });
    }
}

export async function createMeeting(req: Request, res: Response): Promise<void> {
    try {
        const meeting = extractMeetingFromBody(req.body as NewMeeting);
        const validationError = validateMeeting(meeting, false);

        if (validationError) {
            res.status(400).json({ message: validationError });
            return;
        }

        const meetingId = await addMeeting(meeting);
        res.status(201).json({ meeting_id: meetingId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add meeting" });
    }
}

export async function editMeeting(req: Request, res: Response): Promise<void> {
    try {
        const meetingId = parsePositiveId(req.params.meetingId);

        if (meetingId === null) {
            res.status(400).json({ message: "meetingId must be a positive integer" });
            return;
        }

        const meeting = extractMeetingFromBody(req.body as NewMeeting);
        const validationError = validateMeeting(meeting, true);

        if (validationError) {
            res.status(400).json({ message: validationError });
            return;
        }

        const updated = await updateMeeting(meetingId, meeting);

        if (!updated) {
            res.status(404).json({ message: "Meeting not found" });
            return;
        }

        res.json({ message: "Meeting updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update meeting" });
    }
}

export async function removeMeeting(req: Request, res: Response): Promise<void> {
    try {
        const meetingId = parsePositiveId(req.params.meetingId);

        if (meetingId === null) {
            res.status(400).json({ message: "meetingId must be a positive integer" });
            return;
        }

        const deleted = await deleteMeeting(meetingId);

        if (!deleted) {
            res.status(404).json({ message: "Meeting not found" });
            return;
        }

        res.json({ message: "Meeting deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete meeting" });
    }
}