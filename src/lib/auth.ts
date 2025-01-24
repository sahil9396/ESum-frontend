import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const backendURL = process.env.BACKEND_URL || "http://localhost:8080";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          // prompt: "consent",
          // access_type: "offline",
          // response_type: "code",
          scope: [
            "https://www.googleapis.com/auth/gmail.readonly",
            "openid",
            "profile",
            "email",
          ].join(" "),
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!(profile?.email && profile?.name)) {
          return false;
        }
        try {
          if (account?.refresh_token) {
            await userRegister(
              profile?.email,
              account.refresh_token,
              profile?.name
            );
          } else {
            const refreshToken = await userCheck(profile?.email);
            if (!refreshToken) {
              return false;
            }
          }
        } catch (error) {
          console.log("error", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (user) {
        token.id = user.id as number;
        token.email = user.email;
        // token.password = user.password;
      }

      const currentTime = Date.now();
      const tokenTime = token?.accessTokenExpires * 1000;
      if (tokenTime - currentTime < 0 && token.accessToken !== "") {
        try {
          const newAccessTokenWithBearer = await refreshTokenCall(token.email);
          if (newAccessTokenWithBearer) {
            return {
              ...token,
              accessToken: newAccessTokenWithBearer.access_token,
              accessTokenExpires: newAccessTokenWithBearer.expires_in,
              emailVerified: profile?.email_verified,
            };
          } else {
            return {
              ...token,
              accessToken: "",
              accessTokenExpires: 0,
              emailVerified: profile?.email_verified,
            };
          }
        } catch (error) {
          console.log("error", error);
        }
        console.log("Token Expired");
      }

      return {
        ...token,
        accessToken: account?.access_token || token.accessToken,
        accessTokenExpires: account?.expires_at || token.accessTokenExpires,
        emailVerified: profile?.email_verified,
        exp: token.accessTokenExpires,
      };
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          accessToken: token.accessToken,
          accessTokenExpires: token.accessTokenExpires,
        },
        expires: token.accessTokenExpires,
      };
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/authError",
  },
};

const userRegister = async (
  email: string,
  refresh_token: string,
  name: string
) => {
  try {
    await axios.post(backendURL + "/user", {
      email: email,
      refresh_token: refresh_token,
      username: name,
    });
  } catch (error) {
    console.error("User Registration Failed:", error);
    throw new Error("User Registration Failed");
  }
};

const userCheck = async (email: string) => {
  try {
    const response = await axios.get(
      backendURL + "/user" + `?emailID=${email}`
    );
    if (response.status !== 200) {
      return null;
    }
    return "ajfdsl";
  } catch (error) {
    console.error("User Check Failed:", error);
    return null;
  }
};

type refreshTokenResponse = {
  expires_in: number;
  access_token: string;
};

const refreshTokenCall = async (email: string) => {
  try {
    const response = await axios.post(backendURL + "/user/refresh", {
      email: email,
    });
    const data: refreshTokenResponse = response.data;
    return data;
  } catch (error) {
    console.error("error from refreshTokenCall", error);
    return null;
  }
};
