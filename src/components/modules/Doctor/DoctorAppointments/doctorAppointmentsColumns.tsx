import {
  getAppointmentStatusBadgeVariant,
  getPaymentStatusBadgeVariant,
} from "@/components/modules/Admin/AppointmentsManagement/appointmentsColumns"
import DateCell from "@/components/shared/cell/DateCell"
import UserInfoCell from "@/components/shared/cell/UserInfoCell"
import { Badge } from "@/components/ui/badge"
import { type IAppointment } from "@/types/appointment.types"
import { ColumnDef } from "@tanstack/react-table"

export const doctorAppointmentsColumns: ColumnDef<IAppointment>[] = [
  {
    id: "patient",
    header: "Patient",
    enableSorting: false,
    cell: ({ row }) => {
      const patient = row.original.patient
      if (!patient?.name) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }
      return <UserInfoCell name={patient.name} email={patient.email || "-"} />
    },
  },
  {
    id: "startDateTime",
    header: "Appointment Time",
    cell: ({ row }) => {
      const startDateTime = row.original.schedule?.startDateTime
      if (!startDateTime) return <span className="text-sm text-muted-foreground">N/A</span>
      return <DateCell date={startDateTime} formatString="MMM dd, yyyy hh:mm a" />
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant={getAppointmentStatusBadgeVariant(row.original.status)}>
        <span className="capitalize">{row.original.status?.toLowerCase() || "unknown"}</span>
      </Badge>
    ),
  },
  {
    id: "paymentStatus",
    accessorKey: "paymentStatus",
    header: "Payment",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant={getPaymentStatusBadgeVariant(row.original.paymentStatus)}>
        <span className="capitalize">{row.original.paymentStatus?.toLowerCase() || "unpaid"}</span>
      </Badge>
    ),
  },
  {
    id: "videoCallingId",
    header: "Video Call",
    enableSorting: false,
    cell: ({ row }) => {
      if (!row.original.videoCallingId) {
        return <span className="text-sm text-muted-foreground">-</span>
      }
      return <span className="text-sm font-mono text-xs">{row.original.videoCallingId}</span>
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Booked On",
    cell: ({ row }) => {
      if (!row.original.createdAt) return <span className="text-sm text-muted-foreground">N/A</span>
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
]
