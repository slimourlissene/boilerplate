import { useDialogStore } from "@/store/dialogStore";
import { useLoadingStore } from "@/store/loadingStore";
import { magicLinkSchema } from "@/types/schemas";
import onSubmit from "@/utils/users/magicLinkSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AutoForm from "../ui/auto-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export default function MagicLinkForm() {
  const { loading, setLoading } = useLoadingStore();
  const { setOpen } = useDialogStore();
  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full mt-5 flex flex-row items-end gap-3"
        onSubmit={form.handleSubmit((data: z.infer<typeof magicLinkSchema>) =>
          onSubmit({
            data,
            setLoading,
            setOpen,
          })
        )}
      >
        <AutoForm
          fields={[{ name: "email", label: "Email", type: "email" }]}
          schema={magicLinkSchema}
          form={form}
        />
        <Button
          disabled={loading}
          className="w-full max-w-[140px]"
          variant={"secondary"}
          type="submit"
        >
          Send magic link
        </Button>
      </form>
    </Form>
  );
}
