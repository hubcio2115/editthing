import { auth } from "./server/auth";

export { auth as middleware };

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
