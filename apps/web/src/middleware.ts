import { auth } from "./server/auth";

export default auth;

export const config = { matcher: ["/dashboard", "/api/projects/"] };
