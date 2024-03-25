import { eq } from "drizzle-orm";

import { insertOrganizationSchema } from "~/lib/validators/organization";
import { organizations, usersToOrganizations } from "~/server/db/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const organizationRouter = createTRPCRouter({
  getOwnOrganizations: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(organizations)
      .where(eq(organizations.owner, ctx.session.user.id));
  }),

  getOrganizations: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
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
      .where(eq(usersToOrganizations.memberId, ctx.session.user.id));
  }),

  createOrganization: protectedProcedure
    .input(insertOrganizationSchema.omit({ owner: true }))
    .mutation(async ({ ctx, input }) => {
      const newOrganization = await ctx.db
        .insert(organizations)
        .values({ name: input.name, owner: ctx.session.user.id })
        .returning();

      return newOrganization;
    }),
});
