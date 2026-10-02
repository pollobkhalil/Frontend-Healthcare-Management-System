import { type IBookAppointmentPayload } from "@/types/appointment.types"
import { z } from "zod"

export const bookAppointmentServerZodSchema = z.object({
  doctorId: z.uuid("Doctor id must be a valid UUID"),
  scheduleId: z.uuid("Schedule id must be a valid UUID"),
}) satisfies z.ZodType<IBookAppointmentPayload>

// ---------------------------------------------------------------------------
// Admin — Change Appointment Status
// Body sent to backend: { "status": "COMPLETED" }
// ---------------------------------------------------------------------------
export const appointmentStatusOptions = ["SCHEDULED", "INPROGRESS", "COMPLETED", "CANCELED"] as const

export const changeAppointmentStatusZodSchema = z.object({
  status: z.enum(appointmentStatusOptions, {
    message: "Please select a valid appointment status",
  }),
})

export type IChangeAppointmentStatusFormValues = z.infer<typeof changeAppointmentStatusZodSchema>
