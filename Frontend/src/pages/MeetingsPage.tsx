import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import MeetingCard from "../components/MeetingCard";
import { deleteMeeting, getMeetingsByGroupId } from "../services/meetings-service";
import { getAllTeams } from "../services/teams-service";
import type { Meeting, Team } from "../types";

// דף ראשי להצגת פגישות לפי קבוצת פיתוח עם מחיקה.
function MeetingsPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [teamsLoading, setTeamsLoading] = useState(true);
    const [meetingsLoading, setMeetingsLoading] = useState(false);
    const [teamsError, setTeamsError] = useState<string | null>(null);
    const [meetingsError, setMeetingsError] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // טעינת כל קבוצות הפיתוח פעם אחת בעת עלות הדף.
    useEffect(() => {
        async function loadTeams() {
            try {
                setTeamsLoading(true);
                setTeamsError(null);
                const data = await getAllTeams();
                setTeams(data);
            } catch (err) {
                setTeamsError(err instanceof Error ? err.message : "שגיאה בטעינת קבוצות הפיתוח");
            } finally {
                setTeamsLoading(false);
            }
        }
        void loadTeams();
    }, []);

    // טעינת פגישות בכל פעם שהקבוצה הנבחרת משתנה.
    useEffect(() => {
        if (selectedGroupId === null) return;
        const groupId = selectedGroupId;

        async function loadMeetings() {
            try {
                setMeetingsLoading(true);
                setMeetingsError(null);
                setDeleteError(null);
                const data = await getMeetingsByGroupId(groupId);
                setMeetings(data);
            } catch (err) {
                setMeetingsError(err instanceof Error ? err.message : "שגיאה בטעינת פגישות");
            } finally {
                setMeetingsLoading(false);
            }
        }
        void loadMeetings();
    }, [selectedGroupId]);

    // מחיקת פגישה ועדכון הרשימה מיידית.
    async function handleDelete(meetingId: number) {
        if (!confirm("האם אתה בטוח שברצונך למחוק את הפגישה?")) return;
        try {
            setDeleteError(null);
            await deleteMeeting(meetingId);
            setMeetings((prev) => prev.filter((m) => m.meeting_id !== meetingId));
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : "שגיאה במחיקת הפגישה");
        }
    }

    if (teamsLoading) return <Loading />;
    if (teamsError) return <ErrorMessage message={teamsError} />;

    return (
        <section className="panel meetings-page">
            <p className="section-label">רשימת פגישות</p>
            <h2>פגישות לפי קבוצת פיתוח</h2>

            <div className="form-group meetings-select-group">
                <label htmlFor="group-select">בחר קבוצת פיתוח</label>
                <select
                    id="group-select"
                    value={selectedGroupId ?? ""}
                    onChange={(e) =>
                        setSelectedGroupId(e.target.value ? Number(e.target.value) : null)
                    }
                >
                    <option value="">-- בחר קבוצה --</option>
                    {teams.map((team) => (
                        <option key={team.group_id} value={team.group_id}>
                            {team.group_name}
                        </option>
                    ))}
                </select>
            </div>

            {deleteError && <ErrorMessage message={deleteError} />}

            {selectedGroupId === null && (
                <p className="meetings-placeholder">
                    בחר קבוצת פיתוח מהרשימה כדי לצפות בפגישות שלה.
                </p>
            )}

            {meetingsLoading && <Loading />}
            {meetingsError && <ErrorMessage message={meetingsError} />}

            {!meetingsLoading && !meetingsError && selectedGroupId !== null &&
                (meetings.length === 0 ? (
                    <p className="meetings-placeholder">לא נמצאו פגישות לקבוצה זו.</p>
                ) : (
                    <div className="meetings-grid">
                        {meetings.map((meeting) => (
                            <MeetingCard
                                key={meeting.meeting_id}
                                meeting={meeting}
                                onDelete={(id) => { void handleDelete(id); }}
                            />
                        ))}
                    </div>
                ))}
        </section>
    );
}

export default MeetingsPage;
