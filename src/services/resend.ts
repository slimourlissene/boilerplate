"use server";
import EmailTemplate from "@/components/email/template";
import { ActionError, safeAction } from "@/lib/safe-action";
import { sendEmailSchema } from "@/types/schemas";
import { CreateEmailResponseSuccess, Resend } from "resend";

const resend: Resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = safeAction
  .schema(sendEmailSchema)
  .action(
    async ({ parsedInput }): Promise<CreateEmailResponseSuccess | null> => {
      try {
        const { toEmails, subject, firstName } = parsedInput;
        console.log(
          "An email is being sent with the following data :",
          parsedInput
        );

        const { data, error } = await resend.emails.send({
          from: "Slim <contact@slimourlissene.fr>",
          to: toEmails,
          subject,
          react: EmailTemplate({ firstName }),
        });

        if (error) {
          throw new ActionError("An error occurred, please try again later");
        }

        console.log("Email sent with the following data :", data);
        return data;
      } catch (error: unknown) {
        console.error(error);
        throw new ActionError("An error occurred, please try again later");
      }
    }
  );
