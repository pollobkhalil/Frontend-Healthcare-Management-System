"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { getAllAppointments } from "@/services/appointment.services"
import { type PaginationMeta } from "@/types/api.types"
import { type IAppointment } from "@/types/appointment.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import ChangeAppointmentStatusModal from "./ChangeAppointmentStatusModal"
import { appointmentsColumns } from "./appointmentsColumns"
import ViewAppointmentDialog from "./ViewAppointmentDialog"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const AppointmentsTable = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams()

  const { viewingItem, editingItem, isViewDialogOpen, isEditModalOpen, onViewOpenChange, onEditOpenChange, tableActions } =
    useRowActionModalState<IAppointment>({ enableDelete: false })

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  })

  const queryString = queryStringFromUrl || initialQueryString

  const { searchTermFromUrl, handleDebouncedSearchChange } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  })

  const { data: appointmentsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["appointments", "all", queryString],
    queryFn: () => getAllAppointments(queryString),
  })

  const appointments = appointmentsResponse?.data ?? []
  const meta: PaginationMeta | undefined = appointmentsResponse?.meta

  return (
    <>
      <DataTable
        data={appointments}
        columns={appointmentsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No appointments found."
        sorting={{ state: optimisticSortingState, onSortingChange: handleSortingChange }}
        pagination={{ state: optimisticPaginationState, onPaginationChange: handlePaginationChange }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search appointments by patient or doctor...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        meta={meta}
        actions={tableActions}
      />

      <ViewAppointmentDialog open={isViewDialogOpen} onOpenChange={onViewOpenChange} appointment={viewingItem} />

      <ChangeAppointmentStatusModal open={isEditModalOpen} onOpenChange={onEditOpenChange} appointment={editingItem} />
    </>
  )
}

export default AppointmentsTable
