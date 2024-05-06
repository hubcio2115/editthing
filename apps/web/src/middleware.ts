import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const token = req.cookies.get("next-auth.session-token")?.value;

      if (token) return true;
      return false;
    },
  },
});

export const config = { matcher: ["/dashboard"] };
