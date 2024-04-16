import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "~/server/db/schema";

export const editProjectSchema = createInsertSchema(projects)
  .omit({ videoEntryId: true, organizationId: true })
  .extend({
    id: z.number(),
    projectName: z.string().max(256),
    projectDescription: z.string().max(512).nullable(),
    title: z.string().max(256).optional(),
    description: z.string().max(512).optional(),
    categoryId: z.string().max(2).optional(),
    defaultLanguage: z.string().max(128).optional(),
    embeddable: z.boolean().optional(),
    license: z.enum(["youtube", "creativeCommon"]).optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).optional(),
    publicStatsViewable: z.boolean().optional(),
    publishAt: z.date().optional(),
    selfDeclaredMadeForKids: z.boolean().optional(),
  });

export type EditProject = z.infer<typeof editProjectSchema>;

export const projectDetailsSchema = createSelectSchema(projects);

export type ProjectDetails = z.infer<typeof projectDetailsSchema>;
