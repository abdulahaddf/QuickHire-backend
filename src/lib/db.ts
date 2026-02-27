import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
