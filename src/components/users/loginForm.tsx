"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDialogStore } from "@/store/dialogStore";
import { useLoadingStore } from "@/store/loadingStore";
import { Field } from "@/types/interfaces";
import { loginSchema } from "@/types/schemas";
import onSubmit from "@/utils/users/loginFormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AutoForm from "../ui/auto-form";
import { DialogClose, DialogFooter } from "../ui/dialog";

export default function LoginForm() {
  const { setOpen } = useDialogStore();
  const { loading, setLoading } = useLoadingStore();
  const router: AppRouterInstance = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fields: Field<typeof loginSchema>[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "e.g. your@email.com",
    },
    {
      name: "password",
      description: "It must be at least 8 characters",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <Form {...form}>
      <form
        className="space-y-4 mt-4"
        onSubmit={form.handleSubmit((data: z.infer<typeof loginSchema>) =>
          onSubmit({
            data,
            router,
            setLoading,
            setOpen,
          })
        )}
      >
        <AutoForm fields={fields} schema={loginSchema} form={form} />
        <DialogFooter className="pt-3">
          <DialogClose asChild>
            <Button variant={"outline"} type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button className="min-w-[100px]" disabled={loading} type="submit">
            Login
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
