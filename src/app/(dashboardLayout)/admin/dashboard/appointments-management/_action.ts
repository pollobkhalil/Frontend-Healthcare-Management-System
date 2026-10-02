"use server"

import { getActionErrorMessage } from "@/lib/actionErrorUtils"
import { changeAppointmentStatus } from "@/services/appointment.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type AppointmentStatus, type IAppointment } from "@/types/appointment.types"
import { changeAppointmentStatusZodSchema } from "@/zod/appointment.validation"

export const changeAppointmentStatusAction = async (
  id: string,
  payload: { status: AppointmentStatus },
): Promise<ApiResponse<IAppointment> | ApiErrorResponse> => {
  if (!id) {
    return { success: false, message: "Invalid appointment id" }
  }

  const parsedPayload = changeAppointmentStatusZodSchema.safeParse(payload)

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    }
  }

  try {
    // Sends: PATCH /appointments/change-appointment-status/:id  { "status": "COMPLETED" }
    return await changeAppointmentStatus(id, parsedPayload.data.status)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update appointment status"),
    }
  }
}
