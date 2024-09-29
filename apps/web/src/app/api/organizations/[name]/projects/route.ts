import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import {
  getOrganizationProjects,
  getOwnOrganizationByName,
} from "~/server/actions/organization";

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } },
) {
  const [organization, err] = await getOwnOrganizationByName(params.name);

  if (err !== null) {
    if (err === "Not found") {
      return redirect("/404");
    }

    return NextResponse.json(
      { message: "Could fetch project." },
      { status: 500 },
    );
  }

  const page = req.nextUrl.searchParams.get("page");
  if (page === null) {
    return NextResponse.json(
      { message: "Page query param is required." },
      { status: 400 },
    );
  }

  const query = req.nextUrl.searchParams.get("q");
  if (query === null) {
    return NextResponse.json(
      { message: "Q query param is required." },
      { status: 400 },
    );
  }

  const projectsResponse = await getOrganizationProjects(
    organization.id,
    +page,
    query,
  );

  return NextResponse.json(projectsResponse);
}
