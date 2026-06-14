import { Link } from "react-router-dom";

// דף הבית מציג הסבר קצר וקישורים מהירים למסכים המרכזיים.
function HomePage() {
    return (
        <section className="home-grid">
            <article className="panel hero-panel">
                <p className="section-label">ברוכים הבאים</p>
                <h2>ניהול פגישות לפיתוח, עיצוב ותיאום צוותים במקום אחד</h2>
                <p>
                    המערכת מאפשרת לצפות בפגישות לפי קבוצת פיתוח, להוסיף פגישות חדשות,
                    לעדכן פרטים ולמחוק פגישות קיימות בצורה נוחה וברורה.
                </p>

                <div className="hero-actions">
                    <Link className="primary-action" to="/meetings">
                        לצפייה בפגישות
                    </Link>
                    <Link className="secondary-action" to="/meetings/new">
                        להוספת פגישה חדשה
                    </Link>
                </div>
            </article>

            <aside className="panel visual-panel">
                <div className="meeting-illustration">
                    <div className="meeting-badge">Team Sync</div>
                    <div className="meeting-card-mini">
                        <span>09:30</span>
                        <strong>Blue Room</strong>
                        <p>תכנון ספרינט והגדרת משימות לצוות הפיתוח.</p>
                    </div>
                </div>
            </aside>

            <article className="panel feature-panel">
                <h3>מה תמצאו במערכת?</h3>
                <ul className="feature-list">
                    <li>סינון פגישות לפי קבוצת פיתוח</li>
                    <li>שמירת מצב תצוגה בהיר או כהה</li>
                    <li>ממשק מלא בעברית עם התאמה למסכים קטנים</li>
                </ul>
            </article>
        </section>
    );
}

export default HomePage;