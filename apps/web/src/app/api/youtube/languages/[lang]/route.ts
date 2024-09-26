import { NextRequest, NextResponse } from "next/server";
import type { SupportedLanguages } from "~/i18n/settings";
import { getYoutubeSupportedLanguages } from "~/server/api/utils/project";
import { auth } from "~/server/auth";

export async function GET(
  _: NextRequest,
  { params }: { params: { lang: SupportedLanguages } },
) {
  const session = auth();

  if (!session) {
    return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
  }

  const [languages, err] = await getYoutubeSupportedLanguages(params.lang);

  if (err !== null) {
    return NextResponse.json(
      { message: "Something went wrong on our end", cause: err },
      { status: 500 },
    );
  }

  return NextResponse.json(languages);
}
