import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma";
import { loginSchema } from "./types/schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "contact@slimourlissene.fr",
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            throw new Error("User not found, please register");
          }

          if (!user.password) {
            throw new Error(
              "User has no password, you should login with a different provider"
            );
          }

          const isPasswordValid = bcrypt.compareSync(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password, please try again");
          }

          return user;
        } catch (error: any) {
          console.error(error);
          throw new CredentialsSignin({ cause: error.message });
        }
      },
    }),
  ],
});
