"use server";

import { eq } from "drizzle-orm";

import type {
  InsertOrganization,
  Organization,
} from "~/lib/validators/organization";
import { projects as projectsTable } from "~/server/db/schema";

import { getServerAuthSession } from "../auth";
import { db } from "../db";
import { organizations, usersToOrganizations } from "../db/schema";

export async function getOwnOrganizations() {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("You must be signed in to perform this action");
  }

  return db
    .select()
    .from(organizations)
    .where(eq(organizations.owner, session.user.id));
}

export async function getOrganizationProjects(id: Organization["id"]) {
  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.organizationId, id));

  return projects;
}

export async function getOrganizations() {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("You must be signed in to perform this action");
  }

  return db
    .select({
      orgId: organizations.id,
      orgName: organizations.name,
      orgOwner: organizations.owner,
    })
    .from(usersToOrganizations)
    .leftJoin(
      organizations,
      eq(usersToOrganizations.organizationId, organizations.id),
    )
    .where(eq(usersToOrganizations.memberId, session.user.id));
}

export async function createOrganization({ name }: InsertOrganization) {
  const session = await getServerAuthSession();

  const newOrg = (
    await db
      .insert(organizations)
      .values({ name, owner: session!.user.id })
      .returning()
  )[0];

  return newOrg;
}
