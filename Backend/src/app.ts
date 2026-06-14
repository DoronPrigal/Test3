import express from "express";
import cors from "cors";
import teamsRouter from "./routes/teams-routes";
import meetingsRouter from "./routes/meetings-routes";

const app = express();

// מאפשר בקשות CORS מכל מקום בסביבת פיתוח.
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Meetings management API is running");
});

app.use("/api/teams", teamsRouter);
app.use("/api/meetings", meetingsRouter);

export default app;