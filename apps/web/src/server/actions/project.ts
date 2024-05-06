"use server";

import { eq } from "drizzle-orm";

import type { InsertProject, Project } from "~/lib/validators/project";

import { db } from "../db";
import { projects as projectTable } from "../db/schema";

export async function createProject(newProject: InsertProject) {
  const project = (
    await db.insert(projectTable).values(newProject).returning()
  )[0];

  return project;
}

export async function getProjectById(id: Project["id"]) {
  const project = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.id, id));

  return project;
}
