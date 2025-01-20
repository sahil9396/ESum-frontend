import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
