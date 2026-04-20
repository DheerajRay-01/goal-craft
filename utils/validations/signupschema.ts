import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(50)
      .trim(),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/, "Username can contain only letters, numbers and underscore")
      .trim(),

    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;