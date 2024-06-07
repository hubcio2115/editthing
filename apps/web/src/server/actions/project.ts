"use server";

import { eq } from "drizzle-orm";

import type { Result } from "~/lib/utils";
import type { InsertProject, Project } from "~/lib/validators/project";

import { db } from "../db";
import { projects as projectTable } from "../db/schema";

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

    .where(eq(projectTable.id, id));

  return project;
}

export async function deleteProjectById(
  id: Project["id"],
): Promise<Result<Project>> {
  try {
    const deletedProject = (
      await db.delete(projectTable).where(eq(projectTable.id, id)).returning()
    )[0];

    return [deletedProject!, null];
  } catch (err) {
    return [null, (err as Error).message];
  }
}
