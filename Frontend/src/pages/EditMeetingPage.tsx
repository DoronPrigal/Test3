import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import MeetingForm from "../components/MeetingForm";
import { getMeetingById, updateMeeting } from "../services/meetings-service";
import { getAllTeams } from "../services/teams-service";
import type { MeetingPayload, Team } from "../types";

// דף עדכון פגישה קיימת. קריאה מקבילה לפגישה ולקבוצות.
function EditMeetingPage() {
    const { meetingId } = useParams<{ meetingId: string }>();
    const navigate = useNavigate();
    const [teams, setTeams] = useState<Team[]>([]);
    const [initialValues, setInitialValues] = useState<MeetingPayload | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // טעינת נתוני הפגישה הקיימת וכל הקבוצות בטעינה מקבילה.
    useEffect(() => {
        if (!meetingId) return;
        const id = Number(meetingId);

        async function loadData() {
            try {
                setLoading(true);
                const [teamsData, meetingData] = await Promise.all([
                    getAllTeams(),
                    getMeetingById(id),
                ]);
                setTeams(teamsData);
                setInitialValues({
                    group_id: meetingData.group_id,
                    start_time: meetingData.start_time,
                    end_time: meetingData.end_time,
                    description: meetingData.description,
                    room: meetingData.room,
                });
            } catch (err) {
                setLoadError(err instanceof Error ? err.message : "שגיאה בטעינת הפגישה");
            } finally {
                setLoading(false);
            }
        }
        void loadData();
    }, [meetingId]);

    // שמירת השינויים, הצגת הודעת הצלחה וניווט לדף הפגישות לאחר 2 שניות.
    async function handleSubmit(payload: MeetingPayload) {
        if (!meetingId) return;
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            await updateMeeting(Number(meetingId), payload);
            setSuccessMessage("הפגישה עודכנה בהצלחה!");
            setTimeout(() => navigate("/meetings"), 2000);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "שגיאה בעדכון הפגישה");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loading) return <Loading />;
    if (loadError) return <ErrorMessage message={loadError} />;
    if (!initialValues) return <ErrorMessage message="לא נמצאה הפגישה המבוקשת" />;

    return (
        <section className="panel">
            <p className="section-label">טופס עדכון</p>
            <h2>עדכון פגישה קיימת</h2>

            {successMessage && (
                <div className="toast toast-success">{successMessage}</div>
            )}

            <MeetingForm
                initialValues={initialValues}
                teams={teams}
                onSubmit={handleSubmit}
                allowPastStart={true}
                submitLabel="שמור שינויים"
                isSubmitting={isSubmitting}
                submitError={submitError}
            />
        </section>
    );
}

export default EditMeetingPage;
