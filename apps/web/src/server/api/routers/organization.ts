import { and, eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { string, z } from "zod";

import {
  insertOrganizationSchema,
  updateOrganizationNameSchema,
} from "~/lib/validators/organization";
import { createOrganization } from "~/server/db/organizations";
import { organizations, usersToOrganizations } from "~/server/db/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const organizationRouter = createTRPCRouter({
  getOwnOrganizations: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(organizations)
      .where(eq(organizations.owner, ctx.session.user.id));
  }),

  getOwnOrganizationByName: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.organizations.findFirst({
        where({ owner, name }, { and, eq }) {
          return and(eq(owner, ctx.session.user.id), eq(name, input));
        },
      });
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

  // TODO: Implement this
  getMembersOfOrganization: protectedProcedure.query(async ({ ctx }) => {}),

  createOrganization: protectedProcedure
    .input(insertOrganizationSchema)
    .mutation(async ({ ctx, input }) => {
      const newOrganization = (
        await createOrganization(ctx.db, input.name, ctx.session.user.id)
      )[0];

      return newOrganization;
    }),

  updateOrganizationName: protectedProcedure
    .input(updateOrganizationNameSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(organizations)
        .set({ name: input.name })
        .where(
          and(
            eq(organizations.name, input.oldName),
            eq(organizations.owner, ctx.session.user.id),
          ),
        );
    }),

  deleteOrganization: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(organizations).where(eq(organizations.name, input));
    }),
});
