import { type Config } from "drizzle-kit";

import { env } from "~/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./.drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["editthing-app_*"],
} satisfies Config;
