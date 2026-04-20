import { z } from "zod";

export const usernameValidation = z
  .object({
     username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20)
      .trim()
  })


export type SignupInput = z.infer<typeof usernameValidation>;