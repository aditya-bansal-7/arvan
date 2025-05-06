/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/types/types";
import prisma from "@/lib/prisma-client";
import { CredentialsSignin } from "next-auth";
import { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        mobileNumber: { label: "Mobile Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials:any) => {
        const { mobileNumber, password } = credentials;
        const { data, success } = LoginSchema.safeParse({
          mobileNumber,
          password,
        });

        if (!success) {
          throw new CredentialsSignin({ cause: "Required fields missing" });
        }

        const user = await prisma.user.findUnique({
          where: { mobile_no: data.mobileNumber },
        });

        if (!user) {
          throw new CredentialsSignin({
            cause: "Invalid credentials or user not found",
          });
        }

        if (!user.password) {
          throw new CredentialsSignin({
            cause: "User signed up with social media",
          });
        }

        const isPasswordValid = await bcryptjs.compare(data.password, user.password);

        if (!isPasswordValid) {
          throw new CredentialsSignin({
            cause: "Invalid credentials or user not found",
          });
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.picture = user.image;
        token.mobile_no = user.mobile_no;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.mobile_no = token.mobile_no;
        session.user.role = token.role as "admin" | "user"; 
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;