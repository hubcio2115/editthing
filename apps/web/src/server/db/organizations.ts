"use server";
import "server-only";

import { eq } from "drizzle-orm";

import type { DbConnection } from ".";
import { organizations } from "./schema";

export async function createOrganization(
  db: DbConnection,
  name: string,
  ownerId: string,
) {
  return db.insert(organizations).values({ name, owner: ownerId }).returning();
}

export async function getOrganizationByName(db: DbConnection, name: string) {
  return db
    .select({
      id: organizations.id,
      name: organizations.name,
    })
    .from(organizations)
    .where(eq(organizations.name, name));
}
