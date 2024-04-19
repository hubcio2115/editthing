import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { db } from "~/server/db";
import { projects as projectsTable } from "~/server/db/schema";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: number } },
) {
  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.organizationId, params.id));

  return NextResponse.json(projects);
}
