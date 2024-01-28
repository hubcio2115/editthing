import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

import { organizations } from "~/server/db/schema";

export const insertOrganizationSchema = createInsertSchema(organizations);

export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
