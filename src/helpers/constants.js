import { config } from "dotenv";

config({ path: ".env" });

export const PORT = process.env.PORT || 8080;
export const DB_URL = process.env.DB_URL;
