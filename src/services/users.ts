import { ActionError, safeAction } from "@/lib/safe-action";
import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import saltAndHashPassword from "@/utils/users/saltAndHashPassword";
import { registerSchema } from "@/types/schemas";

export const register = safeAction
  .schema(registerSchema)
  .action(async ({ parsedInput }): Promise<User> => {
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
      throw new ActionError("An error occurred while registering the user");
    }
  });
