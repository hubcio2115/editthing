import { eq } from "drizzle-orm";
import { z } from "zod";

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
      await ctx.db
        .insert(organizations)
        .values({ name: input.name, owner: ctx.session.user.id });

      const newOrganization = (
        await ctx.db
          .select()
          .from(organizations)
          .where(eq(organizations.name, input.name))
      ).at(0);

      return newOrganization;
    }),
});
