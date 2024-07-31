import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "~/server/db/schema";

export const insertProjectSchema = createInsertSchema(projects).extend({
  tags: z
    .string()
    .max(500)
    .regex(/^([a-zA-z]*)|([a-zA-Z]+[a-zA-Z,]*)$/, "Tags can consist only from latin letters.")
    .nullable(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;

export const projectSchema = createSelectSchema(projects);

export type Project = z.infer<typeof projectSchema>;
