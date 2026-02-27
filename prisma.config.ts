import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasource: {
    // For Supabase: CLI uses this URL for migrations -> use DIRECT_URL (port 5432)
    url: env("DIRECT_URL"),
  },
});
