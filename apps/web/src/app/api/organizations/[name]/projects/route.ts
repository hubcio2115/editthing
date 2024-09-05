import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import {
  getOrganizationProjects,
  getOwnOrganizationByName,
} from "~/server/actions/organization";

export async function GET(
  _req: NextRequest,
  { params }: { params: { name: string } },
) {
  const [organization, err] = await getOwnOrganizationByName(params.name);

  if (err !== null) {
    if (err === "Not found") {
      return redirect("404");
    }

    return NextResponse.json(
      { message: "Could fetch project." },
      { status: 500 },
    );
  }

  const projects = await getOrganizationProjects(organization.id);

  return NextResponse.json(projects);
}
