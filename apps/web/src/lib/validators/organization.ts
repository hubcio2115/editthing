import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { organizations } from "~/server/db/schema";

const orgNameRegex = /^[a-zA-Z0-9-]+$/;

export const insertOrganizationSchema = createInsertSchema(organizations)
  .omit({ owner: true })
  .extend({
    name: z
      .string()
      .min(3, "Name must contain at least 3 characters")
      .refine((name) => orgNameRegex.test(name), {
        message: "Name can only contain alphanumeric characters and '-' sign",
      }),
  });

export const updateOrganizationNameSchema = insertOrganizationSchema
  .pick({
    name: true,
  })
  .extend({
    oldName: z.string(),
  });

export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;

export const organizationSchema = createSelectSchema(organizations);

export type Organization = z.infer<typeof organizationSchema>;

export type UpdateOrganizationName = z.infer<
  typeof updateOrganizationNameSchema
>;
