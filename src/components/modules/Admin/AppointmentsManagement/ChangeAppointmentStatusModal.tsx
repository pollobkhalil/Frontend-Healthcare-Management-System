"use client"

import { changeAppointmentStatusAction } from "@/app/(dashboardLayout)/admin/dashboard/appointments-management/_action"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type IAppointment, type AppointmentStatus } from "@/types/appointment.types"
import { appointmentStatusOptions } from "@/zod/appointment.validation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface ChangeAppointmentStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: IAppointment | null
}

const ChangeAppointmentStatusModal = ({ open, onOpenChange, appointment }: ChangeAppointmentStatusModalProps) => {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<AppointmentStatus>("SCHEDULED")

  useEffect(() => {
    if (appointment?.status) {
      setStatus(appointment.status)
    }
  }, [appointment])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, status: nextStatus }: { id: string; status: AppointmentStatus }) =>
      changeAppointmentStatusAction(id, { status: nextStatus }),
  })

  const handleSubmit = async () => {
    if (!appointment) {
      toast.error("Appointment not found")
      return
    }

    const result = await mutateAsync({ id: appointment.id, status })

    if (!result.success) {
      toast.error(result.message || "Failed to update appointment status")
      return
    }

    toast.success(result.message || "Appointment status updated successfully")
    onOpenChange(false)

    void queryClient.invalidateQueries({ queryKey: ["appointments"] })
    void queryClient.refetchQueries({ queryKey: ["appointments"], type: "active" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Appointment Status</DialogTitle>
          <DialogDescription>
            Change the status for {appointment?.patient?.name ? `${appointment.patient.name}'s` : "this"} appointment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <Label htmlFor="appointment-status">Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as AppointmentStatus)}>
            <SelectTrigger id="appointment-status" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {appointmentStatusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  <span className="capitalize">{option.toLowerCase()}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <AppSubmitButton isPending={isPending} pendingLabel="Updating..." className="w-auto" onClick={() => void handleSubmit()}>
            Update Status
          </AppSubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeAppointmentStatusModal
