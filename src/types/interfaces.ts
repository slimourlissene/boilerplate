import { z } from "zod";

export interface SidebarItem {
  title?: string;
  url?: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
}

export type Field<T extends z.ZodObject<any>> = {
  name: keyof z.infer<T>;
  description?: string;
  placeholder?: string;
  label?: string;
  switch_label?: string;
  type: string;
  options?: { label: string; value: string }[];
};
