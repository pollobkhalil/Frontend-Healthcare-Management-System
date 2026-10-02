"use server"

import { getActionErrorMessage } from "@/lib/actionErrorUtils"
import { createSpecialty, deleteSpecialty } from "@/services/specialty.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type ICreateSpecialtyPayload, type ISpecialty } from "@/types/specialty.types"
import { createSpecialtyServerZodSchema } from "@/zod/specialty.validation"

export const createSpecialtyAction = async (
  payload: ICreateSpecialtyPayload,
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  const parsedPayload = createSpecialtyServerZodSchema.safeParse({
    title: payload.title,
    icon: payload.icon?.trim() ? payload.icon.trim() : undefined,
  })

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }

  try {
    return await createSpecialty(parsedPayload.data)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create specialty"),
    }
  }
}

export const deleteSpecialtyAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return { success: false, message: "Invalid specialty id" }
  }

  try {
    return await deleteSpecialty(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete specialty"),
    }
  }
}
