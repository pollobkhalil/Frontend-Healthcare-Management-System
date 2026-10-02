import DateCell from "@/components/shared/cell/DateCell"
import UserInfoCell from "@/components/shared/cell/UserInfoCell"
import { Badge } from "@/components/ui/badge"
import { type IAppointment } from "@/types/appointment.types"
import { ColumnDef } from "@tanstack/react-table"

export const getAppointmentStatusBadgeVariant = (status?: string) => {
  switch (status) {
    case "COMPLETED":
      return "default" as const
    case "INPROGRESS":
      return "secondary" as const
    case "CANCELED":
      return "destructive" as const
    default:
      return "outline" as const // SCHEDULED / unknown
  }
}

export const getPaymentStatusBadgeVariant = (status?: string) => {
  switch (status) {
    case "PAID":
      return "default" as const
    case "FAILED":
      return "destructive" as const
    default:
      return "secondary" as const // UNPAID / unknown
  }
}

export const appointmentsColumns: ColumnDef<IAppointment>[] = [
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
    id: "doctor",
    header: "Doctor",
    enableSorting: false,
    cell: ({ row }) => {
      const doctor = row.original.doctor
      if (!doctor?.name) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }
      return <UserInfoCell name={doctor.name} email={doctor.designation || doctor.email || "-"} profilePhoto={doctor.profilePhoto} />
    },
  },
  {
    id: "schedule",
    header: "Schedule",
    enableSorting: false,
    cell: ({ row }) => {
      const schedule = row.original.schedule
      if (!schedule?.startDateTime) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }
      return <DateCell date={schedule.startDateTime} formatString="MMM dd, yyyy hh:mm a" />
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
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Booked On",
    cell: ({ row }) => {
      if (!row.original.createdAt) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
]
