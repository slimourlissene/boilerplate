"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoadingStore } from "@/store/loadingStore";
import { Field } from "@/types/interfaces";
import { registerSchema } from "@/types/schemas";
import onSubmit from "@/utils/users/registerFormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AutoForm from "../ui/auto-form";
import { DialogClose, DialogFooter } from "../ui/dialog";

export default function RegisterForm() {
  const { loading, setLoading } = useLoadingStore();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const fields: Field<typeof registerSchema>[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "e.g. your@email.com",
    },
    {
      name: "firstname",
      label: "Firstname",
      type: "text",
      placeholder: "e.g. John",
    },
    {
      name: "lastname",
      label: "Lastname",
      type: "text",
      placeholder: "e.g. Doe",
    },
    {
      name: "password",
      description: "It must be at least 8 characters",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
    {
      name: "confirmPassword",
      description: "It must be at least 8 characters, same as password",
      label: "Confirm password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <Form {...form}>
      <form
        className="space-y-4 mt-4"
        onSubmit={form.handleSubmit((data: z.infer<typeof registerSchema>) =>
          onSubmit({ data, setLoading }).then(() => form.reset())
        )}
      >
        <AutoForm fields={fields} schema={registerSchema} form={form} />
        <DialogFooter className="pt-3">
          <DialogClose asChild>
            <Button variant={"outline"} type="button">
              Annuler
            </Button>
          </DialogClose>
          <Button className="min-w-[100px]" disabled={loading} type="submit">
            S'inscrire
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
