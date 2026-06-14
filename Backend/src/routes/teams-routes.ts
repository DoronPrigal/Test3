import { Router } from "express";
import { getTeams } from "../controllers/teams-controller";

const teamsRouter = Router();

teamsRouter.get("/", getTeams);

export default teamsRouter;