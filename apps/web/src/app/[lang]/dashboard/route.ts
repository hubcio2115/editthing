import { NextRequest, NextResponse } from "next/server";
import { getDefaultUserOrganization } from "~/server/api/utils/organizations";
import { auth } from "~/server/auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  const org = (await getDefaultUserOrganization(session!.user.id)).at(0);

  const url = req.nextUrl.clone();

  url.pathname = org
    ? `${req.nextUrl.pathname}/${org.organizations?.name}/overview`
    : "/404";

  return NextResponse.redirect(url);
}
