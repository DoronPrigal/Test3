import { Router } from "express";
import {
    createMeeting,
    editMeeting,
    getMeeting,
    getMeetingsByGroup,
    removeMeeting,
} from "../controllers/meetings-controller";

const meetingsRouter = Router();

meetingsRouter.get("/group/:groupId", getMeetingsByGroup);
meetingsRouter.get("/:meetingId", getMeeting);
meetingsRouter.post("/", createMeeting);
meetingsRouter.put("/:meetingId", editMeeting);
meetingsRouter.delete("/:meetingId", removeMeeting);

export default meetingsRouter;