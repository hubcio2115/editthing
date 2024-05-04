import { eq } from "drizzle-orm";
import type { User } from "next-auth";
import "server-only";

import type { Organization } from "~/lib/validators/organization";

import { type DbConnection } from ".";
import { organizations } from "./schema";

export async function getOrganizationByName(
  db: DbConnection,
  name: Organization["name"],
) {
  return db.select().from(organizations).where(eq(organizations.name, name));
}

export async function createOrganization(
  db: DbConnection,
  name: Organization["name"],
  ownerId: User["id"],
) {
  return db.insert(organizations).values({ name, owner: ownerId }).returning();
}
