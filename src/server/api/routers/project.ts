import { eq } from "drizzle-orm";
import { z } from "zod";

import { projects } from "~/server/db/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const projectSchema = z.object({
  projectName: z.string().max(256),
  projectDescription: z.string().max(512).optional(),
  title: z.string().max(256).optional(),
  description: z.string().max(512).optional(),
  categoryId: z.string().max(128).optional(),
  defaultLanguage: z.string().max(128).optional(),
  embeddable: z.boolean().optional(),
  license: z.enum(["youtube", "creativeCommon"]).optional(),
  privacyStatus: z.enum(["public", "unlisted", "private"]).optional(),
  publicStatsViewable: z.boolean().optional(),
  publishAt: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)))
    .optional(),
  selfDeclaredMadeForKids: z.boolean().optional(),
  organizationId: z.number(),
});

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
});
