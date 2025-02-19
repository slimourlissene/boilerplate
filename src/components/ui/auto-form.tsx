import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/types/interfaces";
import cuid from "cuid";
import { Key } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export default function AutoForm({
  fields,
  schema,
  form,
}: {
  fields: Field<any>[];
  schema: z.ZodObject<any>;
  form: UseFormReturn<any>;
}) {
  return (
    <>
      {fields.map((field: Field<typeof schema>, key: Key) => (
        <FormField
          key={key}
          control={form.control}
          name={field.name.toString()}
          render={({ field: formField }) => (
            <FormItem className="w-full">
              <div>
                <FormLabel>{field.label}</FormLabel>
                {field.description && (
                  <FormDescription className="mb-1">
                    {field.description}
                  </FormDescription>
                )}
              </div>
              <FormControl>
                {field.type === "select" ? (
                  <Select
                    value={formField.value}
                    onValueChange={formField.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {field.options?.map(
                          (
                            option: { value: string; label: string },
                            key: number
                          ) => (
                            <SelectItem key={key} value={option.value}>
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : field.type === "textarea" ? (
                  <Textarea placeholder={field.placeholder} {...formField} />
                ) : field.type === "checkbox" ? (
                  <div className="p-1 flex flex-col gap-2">
                    {field.options?.map(
                      (option: { value: string; label: string }, key: Key) => {
                        const generatedId: string = cuid();
                        return (
                          <div
                            className="flex flex-row gap-2 items-center"
                            key={generatedId}
                          >
                            <Checkbox
                              id={generatedId}
                              value={formField.value?.includes(option.value)}
                            />
                            <FormLabel htmlFor={generatedId}>
                              {" "}
                              {option.label}{" "}
                            </FormLabel>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : field.type === "switch" ? (
                  (() => {
                    const generatedId: string = cuid();
                    return (
                      <div className="flex flex-row items-center gap-2">
                        <Switch
                          id={generatedId}
                          checked={formField.value}
                          onCheckedChange={formField.onChange}
                        />
                        <FormLabel htmlFor={generatedId}>
                          {field.switch_label}
                        </FormLabel>
                      </div>
                    );
                  })()
                ) : (
                  <Input
                    placeholder={field.placeholder}
                    type={field.type}
                    {...formField}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
