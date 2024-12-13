import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { IUser } from "./database/user.model";
import { api } from "./lib/api";
import logger from "./lib/logger";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      console.log("TOKEN IN SESSION:", token);
      console.log("ORIGINAL SESSION:", session);
      const isValidObjectId = mongoose.Types.ObjectId.isValid;
      if (token.sub && !isValidObjectId(token.sub)) {
        logger.error(`Invalid ObjectId: ${token.sub}`);
        redirect("/sign-in");
      }
      session.user.id = token.sub || (token.userId as string);
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        if (!profile?.email) {
          logger.error("Email is missing from the profile");
          return token;
        }
        const { data: existingUser, success } = (await api.users.getByEmail(
          profile?.email
        )) as ActionResponse<IUser>;

        if (!success || !existingUser) return token;

        token.userId = existingUser._id.toString();
        token.sub = existingUser._id.toString();
      }

      return token;
    },
    async signIn({ user, account }) {
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username: user.name?.toLowerCase() as string,
      };

      const { success, data: createdUser } = (await api.auth.oAuthSignIn({
        user: userInfo,
      })) as ActionResponse<IUser>;

      if (!success || !createdUser) {
        logger.error(`Failed to create user: ${user.email}`);
        return false;
      }

      if (createdUser.role === "user") {
        logger.warn(
          `Access denied for user ${createdUser.email}: has "user" role`
        );
        return "/unauthorized";
      }
      return true;
    },
  },
});
