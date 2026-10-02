import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { type IAppointment } from "@/types/appointment.types"
import { getAppointmentStatusBadgeVariant, getPaymentStatusBadgeVariant } from "./appointmentsColumns"

interface ViewAppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: IAppointment | null
}

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-1.5 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
)

const ViewAppointmentDialog = ({ open, onOpenChange, appointment }: ViewAppointmentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>Full details for this appointment.</DialogDescription>
        </DialogHeader>

        {appointment && (
          <div className="space-y-1">
            <InfoRow label="Patient" value={appointment.patient?.name || "N/A"} />
            <InfoRow label="Patient Email" value={appointment.patient?.email || "N/A"} />
            <Separator className="my-2" />
            <InfoRow label="Doctor" value={appointment.doctor?.name || "N/A"} />
            <InfoRow label="Designation" value={appointment.doctor?.designation || "N/A"} />
            <InfoRow label="Fee" value={appointment.doctor?.appointmentFee ?? "N/A"} />
            <Separator className="my-2" />
            <InfoRow
              label="Schedule Start"
              value={
                appointment.schedule?.startDateTime ? (
                  <DateCell date={appointment.schedule.startDateTime} formatString="MMM dd, yyyy hh:mm a" />
                ) : (
                  "N/A"
                )
              }
            />
            <InfoRow
              label="Schedule End"
              value={
                appointment.schedule?.endDateTime ? (
                  <DateCell date={appointment.schedule.endDateTime} formatString="MMM dd, yyyy hh:mm a" />
                ) : (
                  "N/A"
                )
              }
            />
            <Separator className="my-2" />
            <InfoRow
              label="Status"
              value={
                <Badge variant={getAppointmentStatusBadgeVariant(appointment.status)}>
                  <span className="capitalize">{appointment.status?.toLowerCase()}</span>
                </Badge>
              }
            />
            <InfoRow
              label="Payment"
              value={
                <Badge variant={getPaymentStatusBadgeVariant(appointment.paymentStatus)}>
                  <span className="capitalize">{appointment.paymentStatus?.toLowerCase() || "unpaid"}</span>
                </Badge>
              }
            />
            {appointment.payment?.transactionId && (
              <InfoRow label="Transaction ID" value={appointment.payment.transactionId} />
            )}
            {appointment.videoCallingId && <InfoRow label="Video Call ID" value={appointment.videoCallingId} />}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ViewAppointmentDialog
