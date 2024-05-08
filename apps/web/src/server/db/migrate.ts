import { sql } from "@vercel/postgres";
import { config } from "dotenv";
import { sql as sqlD } from "drizzle-orm";
import { PgView, getViewConfig, pgView } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import * as schema from "./schema";

config({ path: ".env" });

export const db = drizzle(sql, { schema });

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: ".drizzle" });
    for (const view of Object.values(schema)) {
      if (view instanceof PgView) {
        db.execute(sqlD`drop view if exists ${view}`);
        db.execute(sqlD`create view ${view} as ${getViewConfig(view).query}`);
      }
    }
    console.log(`Views created`);
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
