import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import MeetingForm from "../components/MeetingForm";
import { createMeeting } from "../services/meetings-service";
import { getAllTeams } from "../services/teams-service";
import type { MeetingPayload, Team } from "../types";

// דף הוספת פגישה חדשה. מניעת פגישה בעבר נאכפת בטופס.
function AddMeetingPage() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamsLoading, setTeamsLoading] = useState(true);
    const [teamsError, setTeamsError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // טעינת קבוצות לתפריט הבחירה בטופס.
    useEffect(() => {
        async function loadTeams() {
            try {
                const data = await getAllTeams();
                setTeams(data);
            } catch (err) {
                setTeamsError(err instanceof Error ? err.message : "שגיאה בטעינת קבוצות");
            } finally {
                setTeamsLoading(false);
            }
        }
        void loadTeams();
    }, []);

    // שמירת הפגישה החדשה, הצגת הודעת הצלחה וניווט לאחר 2 שניות.
    async function handleSubmit(payload: MeetingPayload) {
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            await createMeeting(payload);
            setSuccessMessage("הפגישה נוספה בהצלחה!");
            setTimeout(() => navigate("/meetings"), 2000);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "שגיאה ביצירת הפגישה");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (teamsLoading) return <Loading />;
    if (teamsError) return <ErrorMessage message={teamsError} />;

    return (
        <section className="panel">
            <p className="section-label">טופס הוספה</p>
            <h2>הוספת פגישה חדשה</h2>

            {successMessage && (
                <div className="toast toast-success">{successMessage}</div>
            )}

            <MeetingForm
                teams={teams}
                onSubmit={handleSubmit}
                allowPastStart={false}
                submitLabel="הוסף פגישה"
                isSubmitting={isSubmitting}
                submitError={submitError}
            />
        </section>
    );
}

export default AddMeetingPage;
