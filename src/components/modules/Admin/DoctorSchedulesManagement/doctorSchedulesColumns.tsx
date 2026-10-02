import DateCell from "@/components/shared/cell/DateCell"
import UserInfoCell from "@/components/shared/cell/UserInfoCell"
import { Badge } from "@/components/ui/badge"
import { type IDoctorSchedule } from "@/types/doctorSchedule.types"
import { ColumnDef } from "@tanstack/react-table"

export const doctorSchedulesColumns: ColumnDef<IDoctorSchedule>[] = [
  {
    id: "doctor",
    header: "Doctor",
    enableSorting: false,
    cell: ({ row }) => {
      const doctor = row.original.doctor
      const name = doctor?.name || doctor?.user?.name
      const email = doctor?.email || doctor?.user?.email
      if (!name) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }
      return <UserInfoCell name={name} email={email || "-"} />
    },
  },
  {
    id: "startDateTime",
    header: "Slot Start",
    cell: ({ row }) => {
      const startDateTime = row.original.schedule?.startDateTime
      if (!startDateTime) return <span className="text-sm text-muted-foreground">N/A</span>
      return <DateCell date={startDateTime} formatString="MMM dd, yyyy hh:mm a" />
    },
  },
  {
    id: "endDateTime",
    header: "Slot End",
    cell: ({ row }) => {
      const endDateTime = row.original.schedule?.endDateTime
      if (!endDateTime) return <span className="text-sm text-muted-foreground">N/A</span>
      return <DateCell date={endDateTime} formatString="MMM dd, yyyy hh:mm a" />
    },
  },
  {
    id: "isBooked",
    accessorKey: "isBooked",
    header: "Booked",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant={row.original.isBooked ? "default" : "secondary"}>
        {row.original.isBooked ? "Booked" : "Available"}
      </Badge>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Linked On",
    cell: ({ row }) => {
      if (!row.original.createdAt) return <span className="text-sm text-muted-foreground">N/A</span>
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
]
