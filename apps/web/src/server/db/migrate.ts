import { sql } from "@vercel/postgres";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import * as schema from "./schema";

config({ path: ".env" });

export const db = drizzle(sql, { schema });

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: ".drizzle" });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
