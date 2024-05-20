"use server";

import type { Result } from "~/lib/utils";

import { db } from "../db";
import { videoEntries } from "../db/schema";
import type { InsertVideoEntry, VideoEntry } from "~/lib/validators/videoEntry";

export async function createVideoEntry(
  entry: InsertVideoEntry,
): Promise<Result<VideoEntry>> {
  try {
    const newEntry = (
      await db.insert(videoEntries).values(entry).returning()
    )[0]!;

    return [newEntry, null];
  } catch (err) {
    return [null, (err as Error).message];
  }
}
