import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { User } from "@prisma/client";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const user: User | null = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.password) {
            throw new Error("Password need to be set to sign in");
          }

          const isPasswordValid: boolean = await bcrypt.compareSync(
            password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error: unknown) {
          console.error(error);
          throw new Error("An error occurred while signing in");
        }
      },
    }),
  ],
});
