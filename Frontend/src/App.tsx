import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useTheme } from "./hooks/useTheme";
import AboutPage from "./pages/AboutPage";
import AddMeetingPage from "./pages/AddMeetingPage";
import EditMeetingPage from "./pages/EditMeetingPage";
import HomePage from "./pages/HomePage";
import MeetingsPage from "./pages/MeetingsPage";

// רכיב שורש עם ניתוב ל-5 דפים מלאים.
function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Layout theme={theme} onToggleTheme={toggleTheme}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/meetings" element={<MeetingsPage />} />
                <Route path="/meetings/new" element={<AddMeetingPage />} />
                <Route path="/meetings/edit/:meetingId" element={<EditMeetingPage />} />
            </Routes>
        </Layout>
    );
}

export default App;