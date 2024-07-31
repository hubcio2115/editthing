"use server";

import { asc, eq, inArray } from "drizzle-orm";

import type { Result } from "~/lib/utils";
import type { InsertProject, Project } from "~/lib/validators/project";

import { db } from "../db";
import { projects as projectTable } from "../db/schema";
import { auth } from "../auth";
import { getOwnOrganizations } from "./organization";

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

export async function getProjectById(
  id: Project["id"],
): Promise<Result<Project | null>> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const [organizations, err] = await getOwnOrganizations();

  if (err !== null) {
    return [null, err];
  }

  const organizationIds = organizations.map((org) => org.id);

  const project = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.id, id));

  if (project.length === 0) {
    return [null, null];
  }

  const projects = await db
    .select()
    .from(projectTable)
    .where(inArray(projectTable.organizationId, organizationIds));

  const userHaveAccessToProject = projects.some((p) => p.id === project[0]!.id);
  if (!userHaveAccessToProject) {
    return [null, null];
  }

  return [project[0]!, null];
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

export async function getPaginatedProjects(
  page: number,
): Promise<Result<Project[]>> {
  try {
    const projects = await db
      .select()
      .from(projectTable)
      .orderBy(asc(projectTable.createdAt))
      .limit(10)
      .offset(page);

    return [projects, null];
  } catch (err) {
    return [null, (err as Error).message];
  }
}
