import { fetchJson } from "./api";
import type { Team } from "../types";

// שליפת כל קבוצות הפיתוח.
export async function getAllTeams(): Promise<Team[]> {
    return fetchJson<Team[]>("/teams");
}