// דף אודות המתאר את המערכת ואת מטרת הפרויקט.
function AboutPage() {
    return (
        <section className="about-grid">
            <article className="panel">
                <p className="section-label">אודות המערכת</p>
                <h2>מערכת ניהול פגישות לחברת הייטק</h2>
                <p>
                    המערכת נבנתה כדי לעזור לצוותי פיתוח לנהל פגישות לפי קבוצות,
                    לצפות בזמני התחלה וסיום, ולעדכן את הלו"ז השוטף בצורה פשוטה.
                </p>
            </article>

            <article className="panel">
                <p className="section-label">אודות המתכנת</p>
                <h2>דורון פריגל</h2>
                <p>
                    הפרויקט בנוי בארכיטקטורה מסודרת הכוללת צד שרת ב-Node.js עם TypeScript,
                    וצד לקוח ב-React עם Router, fetch, עיצוב ב-Pure CSS ותמיכה מלאה ב-RTL.
                </p>
            </article>
        </section>
    );
}

export default AboutPage;