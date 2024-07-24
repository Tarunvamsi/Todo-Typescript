import { configDotenv } from "dotenv";

export const requiredEnvVariables = ["JWT_SECRET", "DB_URL"];

export const JWT_EXPIRY = "20d";

// Env variables
export let JWT_SECRET: string;
export let DB_URL: string;
loadConfig();

function loadConfig() {
  configDotenv();
  JWT_SECRET = process.env.JWT_SECRET || "";
  DB_URL = process.env.DB_URL || "";
}
