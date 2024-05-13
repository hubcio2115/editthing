import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

import { videoEntries } from "./schema";

export const videoEntrySchema = createSelectSchema(videoEntries);
export type VideoEntry = z.infer<typeof videoEntrySchema>;

export const insertVideoEntrySchema = createInsertSchema(videoEntries);
export type InsertVideoEntry = z.infer<typeof insertVideoEntrySchema>;
