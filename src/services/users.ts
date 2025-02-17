"use server";
import { ActionError, safeAction } from "@/lib/safe-action";
import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import saltAndHashPassword from "@/utils/users/saltAndHashPassword";
import { loginSchema, registerSchema } from "@/types/schemas";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

export const login = safeAction
  .schema(loginSchema)
  .action(async ({ parsedInput }): Promise<void> => {
    try {
      const { email, password } = parsedInput;
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof CredentialsSignin) {
        throw new ActionError(String(error.cause));
      } else {
        throw new ActionError("An error occurred, please try again later");
      }
    }
  });

export const register = safeAction
  .schema(registerSchema)
  .action(async ({ parsedInput }): Promise<User | undefined> => {
    try {
      const { email, firstname, lastname, password, confirmPassword } =
        parsedInput;
      console.log(
        "A user is trying to register with the following data :",
        parsedInput
      );

      if (password !== confirmPassword) {
        throw new ActionError("Passwords do not match");
      }

      const isUserAlreadyRegistered: User | null = await prisma.user.findUnique(
        {
          where: {
            email,
          },
        }
      );

      if (isUserAlreadyRegistered) {
        throw new ActionError("User already registered");
      }

      const hashedPassword: string = await saltAndHashPassword(password);

      const newUser: User = await prisma.user.create({
        data: {
          email,
          firstname,
          lastname,
          password: hashedPassword,
        },
      });

      console.log(`User ${newUser.id} successfully registered`);
      return newUser;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  });
