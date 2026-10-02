import DateCell from "@/components/shared/cell/DateCell"
import { getIconComponent } from "@/lib/iconMapper"
import { type ISpecialty } from "@/types/specialty.types"
import { ColumnDef } from "@tanstack/react-table"

export const specialtiesColumns: ColumnDef<ISpecialty>[] = [
  {
    id: "icon",
    header: "Icon",
    enableSorting: false,
    cell: ({ row }) => {
      const IconComponent = getIconComponent(row.original.icon || "")
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
          <IconComponent className="size-4 text-muted-foreground" />
        </div>
      )
    },
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.title}</span>,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      if (!row.original.createdAt) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
]
