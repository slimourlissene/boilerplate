import { signIn } from "next-auth/react";
import { loginSchema } from "@/types/schemas";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import { z } from "zod";
import { login } from "@/services/users";

export default async function onSubmit({
  data,
  router,
  setOpen,
  setLoading,
}: {
  data: z.infer<typeof loginSchema>;
  router: AppRouterInstance;
  setOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}): Promise<void> {
  try {
    setLoading(true);
    const { email, password } = data;
    const response = await login({ email, password });
    if (response?.serverError) {
      toast.error(response.serverError);
      return;
    }
    setOpen(false);
    router.refresh();
    toast.success("You are now logged in");
  } catch (error: any) {
    console.error(error);
    toast.error("An error occurred, please try again later");
  } finally {
    setLoading(false);
  }
}
