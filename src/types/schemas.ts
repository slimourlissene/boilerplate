import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  firstname: z.string({
    message: "Invalid firstname",
  }),
  lastname: z.string({
    message: "Invalid lastname",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const sendEmailSchema = z.object({
  subject: z.string(),
  firstName: z.string(),
  toEmails: z.array(z.string().email()),
});
