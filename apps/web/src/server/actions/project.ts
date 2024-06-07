"use server";

import { eq } from "drizzle-orm";

import type { Result } from "~/lib/utils";
import type { InsertProject, Project } from "~/lib/validators/project";

import { db } from "../db";
import { projects as projectTable, videoEntries } from "../db/schema";
import type { InsertVideoEntry } from "~/lib/validators/videoEntry";

export async function createProject(
  newProject: InsertProject,
): Promise<Result<Project>> {
  try {
    const project = (
      await db.insert(projectTable).values(newProject).returning()
    )[0];

    return [project!, null];
  } catch (err) {
    return [null, (err as Error).message];
  }
}

export async function updateProjectById(
  id: Project["id"],
  newData: InsertProject,
): Promise<Result<Project>> {
  try {
    const newProject = (
      await db.update(projectTable).set(newData).returning()
    )[0];

    if (!newProject) {
      return [null, "Project was't found"];
    }

    return [newProject, null];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

/**
 * Returns an `Error` if a project is not found
 */
export async function getProjectById(
  id: Project["id"],
): Promise<Result<Project>> {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projectTable.id, id),
    });

    if (!project) {
      return [null, "Project not found."];
    }

    return [project, null];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

export async function updateVideoEntry(
  id: Project["id"],
  videoEntry: InsertVideoEntry,
): Promise<Result<Project>> {
  try {
    const [newVideoEntry, [project, err]] = await Promise.all([
      db.insert(videoEntries).values(videoEntry).returning(),
      getProjectById(id),
    ]);

    if (err !== null) {
      return [null, err];
    }

    await db
      .delete(videoEntries)
      .where(eq(videoEntries.id, project.videoEntryId));

    await db
      .update(projectTable)
      .set({ videoEntryId: newVideoEntry[0]?.id })
      .where(eq(projectTable.id, id));

    project.videoEntryId = newVideoEntry[0]!.id;

    return [project, null];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

/**
 * If project is not found it'll return `undefined`.
 */
export async function deleteProjectById(
  id: Project["id"],
): Promise<Result<Project | undefined>> {
  try {
    const deletedProject = (
      await db.delete(projectTable).where(eq(projectTable.id, id)).returning()
    )[0];

    if (deletedProject) {
      await db
        .delete(videoEntries)
        .where(eq(videoEntries.id, deletedProject.videoEntryId));
    }

    return [deletedProject, null];
  } catch (err) {
    return [null, (err as Error).message];
  }
}
