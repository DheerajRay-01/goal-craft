import { z } from "zod"

export const roundSchema = z.object({

  title: z
    .string()
    .min(2, "Round title is required"),

  description: z
    .string()
    .min(5, "Round description is required")

})

export const resourceSchema = z.object({

  fileName: z
    .string()
    .min(1),

  fileUrl: z
    .string()
    .url("Invalid file url")

})


export const createExperienceSchema = z.object({

  companyName: z
    .string()
    .min(2, "Company name is required"),

  role: z
    .string()
    .min(2, "Role is required"),

  location: z
    .string()
    .optional(),

  employmentType: z
    .enum([
      "Internship",
      "Full Time",
      "Part Time",
      "Contract"
    ])
    .optional(),

  experienceLevel: z
    .enum([
      "Student",
      "Fresher",
      "1-2 Years",
      "2+ Years"
    ])
    .optional(),

  interviewDate: z
    .string()
    .optional(),

  rounds: z
    .array(roundSchema)
    .min(1, "At least one round is required"),

  skills: z
    .array(z.string())
    .optional(),

  overallExperience: z
    .string()
    .min(20, "Please write your interview experience"),

  questions: z
    .array(z.string())
    .optional(),

  resources: z
    .array(resourceSchema)
    .optional(),

  status: z
    .enum(["draft", "published"])
    .optional()

})