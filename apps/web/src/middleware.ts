import { auth } from "./server/auth";
import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { FALLBACK_LANG, LANGUAGES, COOKIE_NAME } from "./i18n/settings";

const authedPathsRegex = new RegExp(`^/(${LANGUAGES.join("|")})/dashboard.*`);

acceptLanguage.languages(LANGUAGES);

export default auth((req) => {
  let lang;
  if (req.cookies.has(COOKIE_NAME))
    lang = acceptLanguage.get(req.cookies.get(COOKIE_NAME)?.value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = FALLBACK_LANG;

  // Redirect if lang in path is not supported
  if (
    !LANGUAGES.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url),
    );
  } else if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") ?? "");
    const langInReferer = LANGUAGES.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (langInReferer) response.cookies.set(COOKIE_NAME, langInReferer);
    return response;
  }

  if (!req.auth && authedPathsRegex.test(req.nextUrl.pathname)) {
    const callbackUrl = req.nextUrl.pathname;

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(
        `api/auth/signin?callbackUrl=${encodedCallbackUrl}`,
        req.nextUrl.origin,
      ),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
