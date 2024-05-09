"use server";

import { and, eq, or, sql } from "drizzle-orm";

import type {
  InsertOrganization,
  Organization,
  organizationWithMembers,
} from "~/lib/validators/organization";
import {
  organizationWithMembersView,
  projects as projectsTable,
  users,
} from "~/server/db/schema";

import { getServerAuthSession } from "../auth";
import { db } from "../db";
import { organizations, usersToOrganizations } from "../db/schema";

export async function getOwnOrganizations(): Promise<
  [{ id: number; name: string }[], null] | [null, Error]
> {
  const session = await getServerAuthSession();

  if (!session) {
    return [null, new Error("You must be signed in to perform this action")];
  }

  return [
    await db
      .select({
        id: organizationWithMembersView.id,
        name: organizationWithMembersView.name,
        defaultOrg: organizationWithMembersView.defaultOrg,
      })
      .from(organizationWithMembersView)
      .where(eq(organizationWithMembersView.memberId, session.user.id)),
    null,
  ];
}

export async function getOrgViewWithMembers() {
  return db.select().from(organizationWithMembersView).execute();
}

export async function getOwnOrganizationByName(
  name: Organization["name"],
): Promise<[organizationWithMembers, null] | [null, Error]> {
  const session = await getServerAuthSession();

  if (!session) {
    [null, new Error("You must be signed in to perform this action")];
  }

  const organization = (
    await db
      .select()
      .from(organizationWithMembersView)
      .where(
        and(
          eq(organizationWithMembersView.memberId, session!.user.id),
          eq(organizationWithMembersView.name, name),
        ),
      )
  )[0];

  return [organization, null];
}

export async function getOrganizationProjects(id: Organization["id"]) {
  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.organizationId, id));

  return projects;
}

export async function getOrganizations(): Promise<
  | [
      {
        orgId: number | null;
        orgName: string | null;
      }[],
      null,
    ]
  | [null, Error]
> {
  const session = await getServerAuthSession();

  if (!session) {
    return [null, new Error("You must be signed in to perform this action")];
  }

  return [
    await db
      .select({
        orgId: organizations.id,
        orgName: organizations.name,
      })
      .from(usersToOrganizations)
      .leftJoin(
        organizations,
        eq(usersToOrganizations.organizationId, organizations.id),
      )
      .where(eq(usersToOrganizations.memberId, session.user.id)),
    null,
  ];
}

export async function createOrganization({ name }: InsertOrganization) {
  const session = await getServerAuthSession();
  try {
    const newOrg = (
      await db
        .insert(organizations)
        .values({ name })
        .returning({ id: organizations.id, name: organizations.name })
        .execute()
    )[0]!;

    await db
      .insert(usersToOrganizations)
      .values({
        memberId: session!.user.id,
        organizationId: newOrg.id,
        role: "owner",
      })
      .execute();

    return newOrg;
  } catch (e) {
    throw new Error("Organization name already exists");
  }
}

export async function updateOrganizationName({
  oldName,
  name,
}: {
  oldName: string;
  name: string;
}): Promise<null | Error> {
  const session = await getServerAuthSession();

  const owner = (
    await db
      .select()
      .from(organizationWithMembersView)
      .where(
        and(
          eq(organizationWithMembersView.name, oldName),
          eq(organizationWithMembersView.memberRole, "owner"),
        ),
      )
  )[0]!;

  if (owner.memberId !== session!.user.id) {
    throw new Error(
      "You must be the owner of the organization to perform this action",
    );
  }

  await db
    .update(organizations)
    .set({ name })
    .where(and(eq(organizations.name, oldName)));

  return null;
}

export async function deleteOrganization(
  name: Organization["name"],
): Promise<null | Error> {
  const session = await getServerAuthSession();

  const orgWithMember = (
    await db
      .select()
      .from(organizationWithMembersView)
      .where(
        and(
          eq(organizationWithMembersView.memberRole, "owner"),
          eq(organizationWithMembersView.name, name),
        ),
      )
  )[0]!;

  if (orgWithMember.memberId !== session!.user.id) {
    throw new Error(
      "You must be the owner of the organization to perform this action",
    );
  }

  const currentUserOrganizations = await db
    .select()
    .from(usersToOrganizations)
    .where(eq(usersToOrganizations.memberId, session!.user.id))
    .execute();

  if (currentUserOrganizations.length < 2) {
    throw new Error("You must be a member of at least one organization.");
  }

  await db
    .delete(usersToOrganizations)
    .where(eq(usersToOrganizations.organizationId, orgWithMember.id));

  await db.delete(organizations).where(eq(organizations.name, name));

  return null;
}

export async function getMembersOfOrganization(id: Organization["id"]) {
  const members = await db
    .select()
    .from(usersToOrganizations)
    .leftJoin(users, eq(users.id, usersToOrganizations.memberId))
    .leftJoin(
      organizations,
      eq(organizations.id, usersToOrganizations.organizationId),
    )
    .where(or(eq(usersToOrganizations.organizationId, id)))
    .execute();

  return members;
}

export async function addMemberToOrganization({
  organizationId,
  memberId,
  role,
}: {
  organizationId: Organization["id"];
  memberId: string;
  role: "user" | "owner" | "admin";
}) {
  await db
    .insert(usersToOrganizations)
    .values({ organizationId, memberId, role })
    .execute();
}
/**
 *
 * @throws {Error} returning an error instead of throwing an error ends up with the client not being able to recieve it
 */
export async function addMemberToOrganizationByUserEmail({
  organizationId,
  email,
  role,
}: {
  organizationId: Organization["id"];
  email: string;
  role: "user" | "owner" | "admin";
}) {
  const user = (
    await db.select().from(users).where(eq(users.email, email)).execute()
  )[0];

  if (!user) {
    throw new Error("User not found");
  }

  const existingMember = (
    await db
      .select()
      .from(usersToOrganizations)
      .where(
        and(
          eq(usersToOrganizations.organizationId, organizationId),
          eq(usersToOrganizations.memberId, user?.id),
        ),
      )
      .execute()
  )[0];

  if (existingMember) {
    throw new Error("User is already a member of the organization");
  }

  await addMemberToOrganization({
    organizationId,
    memberId: user!.id,
    role,
  });
}

export async function updateMemberRole({
  organizationId,
  memberId,
  role,
}: {
  organizationId: Organization["id"];
  memberId: string;
  role: "user" | "owner" | "admin";
}): Promise<null | Error> {
  const session = await getServerAuthSession();
  const currentOwner = (
    await db
      .select()
      .from(organizationWithMembersView)
      .where(
        and(
          eq(organizationWithMembersView.memberRole, "owner"),
          eq(organizationWithMembersView.id, organizationId),
        ),
      )
  )[0]!;
  if (role === "owner") {
    if (currentOwner.memberId !== session!.user.id) {
      return new Error(
        "You must be the owner of the organization to perform this action",
      );
    }

    await db
      .update(usersToOrganizations)
      .set({ role: "admin" })
      .where(
        and(
          eq(usersToOrganizations.organizationId, organizationId),
          eq(usersToOrganizations.memberId, currentOwner.memberId),
        ),
      )
      .execute();
  }

  if (currentOwner.memberId === memberId) {
    throw new Error(
      "Cannot change the role of the owner, transfer ownership instead",
    );
  }

  await db
    .update(usersToOrganizations)
    .set({ role: role })
    .where(
      and(
        eq(usersToOrganizations.organizationId, organizationId),
        eq(usersToOrganizations.memberId, memberId),
      ),
    )
    .execute();

  return null;
}

export async function removeMemberFromOrganization({
  organizationId,
  memberId,
}: {
  organizationId: Organization["id"];
  memberId: string;
}) {
  const users = await db
    .select()
    .from(usersToOrganizations)
    .where(eq(usersToOrganizations.organizationId, organizationId))
    .execute();

  if (users.length < 2) {
    throw new Error("Unable to remove the last member of the organization");
  }

  if (users.filter((user) => user.memberId === memberId).length === 0) {
    throw new Error("User is not a member of the organization");
  }

  if (
    users
      .filter((user) => user.role === "owner")
      .find((user) => user.memberId === memberId)
  ) {
    throw new Error("Cannot remove the owner of the organization");
  }

  await db
    .delete(usersToOrganizations)
    .where(
      and(
        eq(usersToOrganizations.organizationId, organizationId),
        eq(usersToOrganizations.memberId, memberId),
      ),
    )
    .execute();
}
