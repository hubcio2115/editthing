import { eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import {
  createProjectSchema,
  editProjectSchema,
} from "~/lib/validators/project";
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
      const details = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projId));

      return details[0];
    }),

  createProject: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(projects)
        .values(input)
        .returning({ id: projects.id });
    }),

  editProject: protectedProcedure
    .input(editProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(projects)
        .set({
          projectName: input.projectName,
          projectDescription: input.projectDescription,
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          defaultLanguage: input.defaultLanguage,
          embeddable: input.embeddable,
          license: input.license,
          privacyStatus: input.privacyStatus,
          publicStatsViewable: input.publicStatsViewable,
          publishAt: input.publishAt?.toString(),
          selfDeclaredMadeForKids: input.selfDeclaredMadeForKids,
        })
        .where(eq(projects.id, input.id));
    }),
});
