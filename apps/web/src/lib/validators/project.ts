import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "~/server/db/schema";

export const insertProjectSchema = createInsertSchema(projects);

export type InsertProject = z.infer<typeof insertProjectSchema>;
