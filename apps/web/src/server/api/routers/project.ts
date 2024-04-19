import { eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "~/server/db/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const projectSchema = createSelectSchema(projects);

export const projectRouter = createTRPCRouter({
  getOrgProjects: protectedProcedure
    .input(z.object({ orgId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.organizationId, input.orgId));
    }),

  getProjectDetails: protectedProcedure
    .input(z.object({ projId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projId));
    }),

  createProject: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projects).values(input);
    }),

  deleteProject: protectedProcedure
    .input(z.object({ projId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(projects).where(eq(projects.id, input.projId));
    }),
});
