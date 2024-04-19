import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { db } from "~/server/db";
import { projects } from "~/server/db/schema";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: number } },
) {
  const project = await db
    .select()
    .from(projects)
    .where(eq(projects.id, params.id));

  if (project.length === 0) {
    return NextResponse.json("Not found", {
      status: 404,
    });
  }

  return NextResponse.json(project[0]!);
}
