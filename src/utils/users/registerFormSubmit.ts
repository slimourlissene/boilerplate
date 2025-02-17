import { register } from "@/services/users";
import { registerSchema } from "@/types/schemas";
import { toast } from "sonner";
import { z } from "zod";

export default async function onSubmit({
  data,
  setLoading,
}: {
  data: z.infer<typeof registerSchema>;
  setLoading: (loading: boolean) => void;
}): Promise<void> {
  try {
    setLoading(true);
    const { email, firstname, lastname, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    const response = await register({
      email,
      firstname,
      lastname,
      password,
      confirmPassword,
    });

    if (response?.validationErrors) {
      toast.error("You have entered invalid data");
      return;
    }

    if (response?.serverError) {
      toast.error(response.serverError);
      return;
    }

    toast.success("You have successfully registered, you can now login");
  } catch (error: unknown) {
    console.error(error);
    toast.error("An error occurred while registering the user");
  } finally {
    setLoading(false);
  }
}
