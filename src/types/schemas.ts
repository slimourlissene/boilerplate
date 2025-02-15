import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
