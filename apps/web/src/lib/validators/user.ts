import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

import { users } from "~/server/db/schema";

export const userSchema = createInsertSchema(users);

export type User = z.infer<typeof userSchema>;
