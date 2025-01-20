import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    accessToken: string;
    accessTokenExpires: number;
  }
}
declare module "next-auth" {
  interface User {
    id: number;
    email: string;
  }

  interface Profile extends Profile {
    email: string;
    email_verified: boolean;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      accessToken: string;
      accessTokenExpires: number;
    } & DefaultSession["user"];
    expires: number;
  }
}
