"use server";

import { eq } from "drizzle-orm";
import "server-only";

import type { DbConnection } from ".";
import { organizations } from "./schema";

export async function createOrganization(
  db: DbConnection,
  name: string,
  ownerId: string,
  defaultOrg = false,
) {
  return db
    .insert(organizations)
    .values({ name, owner: ownerId, defaultOrg: defaultOrg })
    .returning();
}

export async function getOrganizationByName(db: DbConnection, name: string) {
  return db
    .select({
      id: organizations.id,
      name: organizations.name,
      defaultOrg: organizations.defaultOrg,
    })
    .from(organizations)
    .where(eq(organizations.name, name));
}
