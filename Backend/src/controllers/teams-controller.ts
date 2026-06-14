import { Request, Response } from "express";
import { getAllTeams } from "../services/teams-service";

export async function getTeams(req: Request, res: Response): Promise<void> {
    try {
        const teams = await getAllTeams();
        res.json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch development groups" });
    }
}