import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { Team } from "../models/team-model";

export async function getAllTeams(): Promise<Team[]> {
    const [rows] = await db.query<(Team & RowDataPacket)[]>(
        "SELECT group_id, group_name FROM dev_groups ORDER BY group_name"
    );

    return rows;
}