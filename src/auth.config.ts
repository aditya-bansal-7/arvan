/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/types/types";
import { prisma } from "@/lib/prisma-client";
import { CredentialsSignin } from "next-auth";
import { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";

const homeRoute = ["/", "/feature", "/pricing", "/contact"];
const authRoute = ["/signIn", "/signUp"];

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        mobileNumber: { label: "Mobile Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("🟢 Credentials Received:", credentials);

        const { mobileNumber, password } = credentials;
        const { data, success } = LoginSchema.safeParse({
          mobileNumber,
          password,
        });

        if (!success) {
          console.error("❌ Validation Failed:", data);
          throw new CredentialsSignin({ cause: "Required fields missing" });
        }

        console.log("✅ Validation Passed:", data);

        const user = await prisma.user.findUnique({
          where: { mobile_no: data.mobileNumber },
        });

        console.log("🔍 User Found:", user);

        if (!user) {
          console.error("❌ User Not Found");
          throw new CredentialsSignin({
            cause: "Invalid credentials or user not found",
          });
        }
        if (!user?.isPhoneNoVerified) {
          console.error("❌ User Not Verified");
          throw new CredentialsSignin({ cause: "User not verified" });
        }

        if (!user.password) {
          console.error("❌ User Signed Up with Social Media");
          throw new CredentialsSignin({
            cause: "User signed up with social media",
          });
        }

        const isPasswordValid = bcryptjs.compare(data.password, user.password);
        console.log("🔐 Password Check:", isPasswordValid);

        if (!isPasswordValid) {
          console.error("❌ Invalid Password");
          throw new CredentialsSignin({
            cause: "Invalid credentials or user not found",
          });
        }

        console.log("✅ Authentication Successful");
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/signIn",
  },

  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      console.log(auth);
      console.log(isLoggedIn);
      const { pathname } = nextUrl;

      // Allow access to the home route for all users
      if (homeRoute.includes(pathname)) {
        return true;
      }

      // Redirect authenticated users away from auth routes
      if (authRoute.includes(pathname)) {
        return isLoggedIn ? Response.redirect(new URL("/", nextUrl)) : true;
      }

      // For all other routes, require user to be logged in
      return isLoggedIn || Response.redirect(new URL("/signIn", nextUrl));
    },

    jwt({ token, user }: any) {
      console.log("🔵 Generating JWT Token...");
      console.log("🔹 User Data:", user);

      if (user) {
        token.id = user.id;
        token.picture = user.image;
        token.role = user?.role as any; // Store user role
      }

      console.log("✅ Token Created:", token);
      return token;
    },

    session({ session, token }: any) {
      console.log("🔄 Creating Session...");
      console.log("🔹 Token Data:", token);

      session.user.id = token.id;
      session.user.image = token.picture;
      session.user.role = token.role; // Pass role to session

      console.log("✅ Session Created:", session);

      // 🚀 Redirect users to "/" after signing in
      return {
        ...session,
        redirect: "/",
      };
    },
  },
} satisfies NextAuthConfig;
