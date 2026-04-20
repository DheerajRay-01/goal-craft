import { ZodError } from "zod";

export const getZodErrorMsg = (error: ZodError) =>
  Object.values(error.flatten().fieldErrors)
    .flat()
    .filter(Boolean)
    .join(", ");