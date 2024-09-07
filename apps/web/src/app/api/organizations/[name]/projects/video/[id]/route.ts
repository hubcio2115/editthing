import { NextRequest, NextResponse } from "next/server";
import { isUserInOrganization } from "~/server/api/utils/organizations";
import { getVideo } from "~/server/api/utils/project";
import { auth } from "~/server/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; name: string } },
) {
  const session = await auth();

  const isUserAuthorized =
    session?.user && (await isUserInOrganization(session.user.id, params.name));

  if (!isUserAuthorized) {
    return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
  }

  const [video, err] = await getVideo(params.name, params.id);

  if (err !== null) {
    return NextResponse.json(
      { message: "Something went wrong on our end", cause: err },
      { status: 500 },
    );
  }

  return NextResponse.json(video);
}
