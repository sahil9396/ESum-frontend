import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(
      "From the middleware : ",
      (req.nextauth.token?.accessTokenExpires as number) >= 0
    );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token && token.accessToken !== "",
    },
    pages: {
      signIn: "/sign-in",
      error: "/authError",
    },
  }
);

export const config = { matcher: ["/dashboard", "/emaildetails/:path*"] };
