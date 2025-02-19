import { magicLinkSchema } from "@/types/schemas";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod";

export default async function onSubmit({
  data,
  setLoading,
  setOpen,
}: {
  data: z.infer<typeof magicLinkSchema>;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
}) {
  try {
    setLoading(true);
    const { email } = data;
    const response = await signIn("resend", {
      email,
      redirect: false,
    });

    if (response?.error) {
      toast.error("An error occurred, please try again later");
      return;
    }

    setOpen(false);
    toast.success("Magic link sent, please check your email");
  } catch (error: unknown) {
    console.error(error);
    toast.error("An error occurred, please try again later");
  } finally {
    setLoading(false);
  }
}
