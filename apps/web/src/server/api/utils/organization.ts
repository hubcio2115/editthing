import { eq } from "drizzle-orm";
import "server-only";

import type { DbConnection } from "~/server/db";
import { organizations } from "~/server/db/schema";

export async function getOrganizationByName(db: DbConnection, name: string) {
  return db
    .select({
      id: organizations.id,
      name: organizations.name,
    })
    .from(organizations)
    .where(eq(organizations.name, name));
}

export async function createOrganization(db: DbConnection, newOrgName: string) {
  return db
    .insert(organizations)
    .values({ name: newOrgName, defaultOrg: true })
    .returning();
}
