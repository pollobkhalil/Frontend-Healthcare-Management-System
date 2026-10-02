import { type ICreateSpecialtyPayload } from "@/types/specialty.types"
import { z } from "zod"

export const createSpecialtyFormZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  icon: z
    .string()
    .trim()
    .max(50, "Icon name must be at most 50 characters")
    .optional()
    .or(z.literal("")),
})

export const createSpecialtyServerZodSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(50, "Title must be at most 50 characters"),
  icon: z.string().trim().max(50).optional(),
}) satisfies z.ZodType<ICreateSpecialtyPayload>

export type ICreateSpecialtyFormValues = z.infer<typeof createSpecialtyFormZodSchema>
