import { type FormEvent, useState } from "react";
import type { MeetingPayload, Team } from "../types";
import { toDatetimeLocal } from "../utils/format-datetime-local";

interface MeetingFormProps {
    initialValues?: Partial<MeetingPayload>;
    teams: Team[];
    onSubmit: (payload: MeetingPayload) => Promise<void>;
    allowPastStart: boolean;
    submitLabel: string;
    isSubmitting: boolean;
    submitError: string | null;
}

// טופס משותף ליצירה ולעדכון של פגישה עם ולידציה מקומית.
function MeetingForm({
    initialValues,
    teams,
    onSubmit,
    allowPastStart,
    submitLabel,
    isSubmitting,
    submitError,
}: MeetingFormProps) {
    const [groupId, setGroupId] = useState<string>(initialValues?.group_id?.toString() ?? "");
    const [startTime, setStartTime] = useState(
        initialValues?.start_time ? toDatetimeLocal(initialValues.start_time) : ""
    );
    const [endTime, setEndTime] = useState(
        initialValues?.end_time ? toDatetimeLocal(initialValues.end_time) : ""
    );
    const [description, setDescription] = useState(initialValues?.description ?? "");
    const [room, setRoom] = useState(initialValues?.room ?? "");
    const [validationError, setValidationError] = useState<string | null>(null);

    // בדיקת תקינות כל השדות לפני שליחה לשרת.
    function validate(): string | null {
        if (!groupId || !startTime || !endTime || !description.trim() || !room.trim()) {
            return "כל השדות הם שדות חובה";
        }
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (!allowPastStart && start.getTime() < Date.now()) {
            return "זמן ההתחלה לא יכול להיות בעבר";
        }
        if (start.getTime() >= end.getTime()) {
            return "זמן ההתחלה חייב להיות לפני זמן הסיום";
        }
        return null;
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const error = validate();
        if (error) {
            setValidationError(error);
            return;
        }
        setValidationError(null);
        void onSubmit({
            group_id: Number(groupId),
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            description: description.trim(),
            room: room.trim(),
        });
    }

    const displayError = validationError ?? submitError;

    return (
        <form className="meeting-form" onSubmit={handleSubmit} noValidate>
            {displayError && <div className="form-error">{displayError}</div>}

            <div className="form-group">
                <label htmlFor="field-group">קבוצת פיתוח</label>
                <select
                    id="field-group"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    required
                >
                    <option value="">-- בחר קבוצה --</option>
                    {teams.map((team) => (
                        <option key={team.group_id} value={team.group_id}>
                            {team.group_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="field-start">זמן התחלה</label>
                <input
                    id="field-start"
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="field-end">זמן סיום</label>
                <input
                    id="field-end"
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="field-description">תיאור הפגישה</label>
                <textarea
                    id="field-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="field-room">חדר</label>
                <input
                    id="field-room"
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder='לדוגמה: "Blue Room"'
                    required
                />
            </div>

            <button className="btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "שומר..." : submitLabel}
            </button>
        </form>
    );
}

export default MeetingForm;
