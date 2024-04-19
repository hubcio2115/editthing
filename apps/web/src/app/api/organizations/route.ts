import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { insertOrganizationSchema } from "~/lib/validators/organization";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { organizations } from "~/server/db/schema";

export async function POST(request: NextRequest) {
  const body = insertOrganizationSchema.safeParse(await request.json());

  if (!body.success) {
    throw body.error;
  }

  const { name } = body.data;
  const session = await getServerAuthSession();

  try {
    const org = (
      await db
        .insert(organizations)
        .values({ name, owner: session!.user.id })
        .returning()
    )[0];

    return NextResponse.json(org);
  } catch (e) {
    switch (true) {
      case e instanceof Error:
        return NextResponse.json({ message: e.message }, { status: 401 });
    }
  }
}
