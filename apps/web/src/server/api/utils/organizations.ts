import { eq } from "drizzle-orm";
import type { User } from "next-auth";
import "server-only";

import type { Organization } from "~/lib/validators/organization";
import { type DbConnection } from "~/server/db/index";
import { organizations, usersToOrganizations } from "~/server/db/schema";

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
  isDefault = false,
) {
  const newOrganization = (
    await db
      .insert(organizations)
      .values({ name, defaultOrg: isDefault })
      .returning()
  )[0]!;

  await db.insert(usersToOrganizations).values({
    organizationId: newOrganization.id,
    memberId: ownerId,
    role: "owner",
  });

  return newOrganization;
}

export async function isUserInOrganization(
  userId: NonNullable<User["id"]>,
  organization: Organization["name"] | Organization["id"],
): Promise<boolean> {
  const userInOrg = await db
    .select()
    .from(usersToOrganizations)
    .leftJoin(
      organizations,
      eq(organizations.id, usersToOrganizations.organizationId),
    )
    .where(
      and(
        eq(usersToOrganizations.memberId, userId),
        eq(
          typeof organization === "number"
            ? organizations.id
            : organizations.name,
          organization,
        ),
      ),
    );

  return userInOrg.length > 0;
}

export async function getOwnerAccount(ownerId: NonNullable<User["id"]>) {
  return (
    await db.select().from(accounts).where(eq(accounts.userId, ownerId))
  ).at(0);
}
