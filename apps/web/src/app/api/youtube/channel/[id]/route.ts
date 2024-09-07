import { NextRequest, NextResponse } from "next/server";
import { getChannel } from "~/server/api/utils/project";
import { auth } from "~/server/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = auth();

  if (!session) {
    return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
  }

  const [categories, err] = await getChannel(params.id);

  if (err !== null) {
    return NextResponse.json(
      { message: "Something went wrong on our end", cause: err },
      { status: 500 },
    );
  }

  return NextResponse.json(categories);
}
