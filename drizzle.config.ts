import "dotenv/config"
import { Config, defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./migrations",
  schema: "./src/lib/supabase/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      (() => {
        throw new Error("DATABASE_URL is required but not defined in .env")
      })(),
  },
}) satisfies Config
