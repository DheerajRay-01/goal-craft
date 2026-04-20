import { z } from "zod";

export const employmentTypeEnum = z.enum([
  "Internship",
  "Full Time",
  "Part Time",
  "Contract",
]);

export const userCategoryEnum = z.enum([
  "Student",
  "Fresher",
  "Professional",
]);

export const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name required"),

  jobTitle: z.string().min(1, "Job title required"),

  employmentType: z.string().optional(),

  location: z.string().optional(),

  startDate: z.string().optional().nullable(),

  endDate: z.string().optional().nullable(),

  currentlyWorking: z.boolean().default(false),
});

export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name required"),

  username: z
    .string()
    .min(3, "Username required"),

  email: z
    .string()
    .email(),

  bio: z
    .string()
    .max(500)
    .optional(),

  avatar: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  userCategory: userCategoryEnum.optional(),

  education: z
    .object({
      university: z.string().optional(),

      degree: z.string().optional(),

      branch: z.string().optional(),

     graduationYear: z
  .union([z.string(), z.number()])
  .optional()
    })
    .optional(),

  experiences: z
    .array(experienceSchema)
    .optional(),
});

export type ProfileInput = z.infer<
  typeof profileUpdateSchema
>;