"use server";

import { and, eq, or } from "drizzle-orm";

import type { Result } from "~/lib/utils";
import type {
  InsertOrganization,
  Organization,
  OrganizationWithMembers,
} from "~/lib/validators/organization";
import { createOrganization as createOrganizationInner } from "~/server/api/utils/organizations";
import { type OrgMemberRole } from "~/lib/validators/organization";
import type { User } from "~/lib/validators/user";
import {
  organizationWithMembersView,
  projects as projectsTable,
  users,
} from "~/server/db/schema";

import { auth } from "../auth";
import { db } from "../db";
import { organizations, usersToOrganizations } from "../db/schema";

export async function getOwnOrganizations(): Promise<
  [{ id: number; name: string }[], null] | [null, Error]
> {
  const session = await auth();

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
): Promise<Result<OrganizationWithMembers>> {
  const session = await auth();

  if (!session) {
    return [null, "You must be signed in to perform this action"];
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
  )[0]!;

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
  Result<
    {
      orgId: Organization["id"] | null;
      orgName: Organization["name"] | null;
    }[]
  >
> {
  const session = await auth();

  if (!session) {
    return [null, "You must be signed in to perform this action."];
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

export async function createOrganization({
  name,
}: InsertOrganization): Promise<Result<Organization>> {
  const session = await auth();

  try {
    const newOrg = await createOrganizationInner(db, name, session?.user.id!, true);

    return [newOrg, null];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

export async function updateOrganizationName({
  oldName,
  name,
}: {
  oldName: Organization["name"];
  name: Organization["name"];
}): Promise<Result<null>> {
  const session = await auth();

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
    return [
      null,
      "You must be the owner of the organization to perform this action",
    ];
  }

  await db
    .update(organizations)
    .set({ name })
    .where(and(eq(organizations.name, oldName)));

  return [null, null];
}

export async function deleteOrganization(
  name: Organization["name"],
): Promise<Result<null>> {
  const session = await auth();

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
    return [
      null,
      "You must be the owner of the organization to perform this action",
    ];
  }

  const currentUserOrganizations = await db
    .select()
    .from(usersToOrganizations)
    .where(eq(usersToOrganizations.memberId, session!.user.id))
    .execute();

  if (currentUserOrganizations.length < 2) {
    return [null, "You must be a member of at least one organization."];
  }

  await db
    .delete(usersToOrganizations)
    .where(eq(usersToOrganizations.organizationId, orgWithMember.id));

  await db.delete(organizations).where(eq(organizations.name, name));

  return [null, null];
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
  role: OrgMemberRole;
}) {
  await db
    .insert(usersToOrganizations)
    .values({ organizationId, memberId, role })
    .execute();
}


/**
 * @throws {Error} returning an error instead of throwing an error ends up with the client not being able to recieve it
 */
export async function addMemberToOrganizationByUserEmail({
  organizationId,
  email,
  role,
}: {
  organizationId: Organization["id"];
  email: string;
  role: OrgMemberRole;
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
  memberId: User["id"];
  role: OrgMemberRole;
}): Promise<null | Error> {
  const session = await auth();
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
  memberId: User["id"];
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
