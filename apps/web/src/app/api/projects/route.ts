import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { insertProjectSchema } from "~/lib/validators/project";
import { db } from "~/server/db";
import { projects } from "~/server/db/schema";

export async function POST(request: NextRequest) {
  const body = insertProjectSchema.safeParse(await request.json());

  if (!body.success) {
    throw body.error;
  }

  const project = (await db.insert(projects).values(body.data).returning())[0];

  return NextResponse.json(project);
}
