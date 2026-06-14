import { useNavigate } from "react-router-dom";
import type { Meeting } from "../types";
import { formatDuration } from "../utils/format-duration";

interface MeetingCardProps {
    meeting: Meeting;
    onDelete: (meetingId: number) => void;
}

// פורמט תאריך ושעה בעברית.
function formatDateTime(isoString: string): string {
    return new Date(isoString).toLocaleString("he-IL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// כרטיסיית פגישה. כתום = עתידית, ירוק = עברה.
function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
    const navigate = useNavigate();
    const isFuture = new Date(meeting.start_time).getTime() > Date.now();

    return (
        <article className={`panel meeting-card ${isFuture ? "meeting-future" : "meeting-past"}`}>
            <header className="meeting-card-header">
                <span className="meeting-room">{meeting.room}</span>
                <span className="meeting-duration">
                    {formatDuration(meeting.start_time, meeting.end_time)}
                </span>
            </header>

            <p className="meeting-description">{meeting.description}</p>

            <div className="meeting-times">
                <div className="meeting-time-row">
                    <span className="meeting-time-label">התחלה:</span>
                    <span>{formatDateTime(meeting.start_time)}</span>
                </div>
                <div className="meeting-time-row">
                    <span className="meeting-time-label">סיום:</span>
                    <span>{formatDateTime(meeting.end_time)}</span>
                </div>
            </div>

            <div className="meeting-card-actions">
                <button
                    className="btn-edit"
                    type="button"
                    onClick={() => navigate(`/meetings/edit/${meeting.meeting_id}`)}
                >
                    עדכון
                </button>
                <button
                    className="btn-delete"
                    type="button"
                    onClick={() => onDelete(meeting.meeting_id)}
                >
                    מחיקה
                </button>
            </div>
        </article>
    );
}

export default MeetingCard;
