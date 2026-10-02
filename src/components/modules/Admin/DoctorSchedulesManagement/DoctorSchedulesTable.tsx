"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { getAllDoctorSchedules } from "@/services/doctorSchedule.services"
import { type PaginationMeta } from "@/types/api.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { doctorSchedulesColumns } from "./doctorSchedulesColumns"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const DoctorSchedulesTable = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams()

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

  const { data: doctorSchedulesResponse, isLoading, isFetching } = useQuery({
    queryKey: ["doctor-schedules", "all", queryString],
    queryFn: () => getAllDoctorSchedules(queryString),
  })

  const doctorSchedules = doctorSchedulesResponse?.data ?? []
  const meta: PaginationMeta | undefined = doctorSchedulesResponse?.meta

  return (
    <DataTable
      data={doctorSchedules}
      columns={doctorSchedulesColumns}
      isLoading={isLoading || isFetching || isRouteRefreshPending}
      emptyMessage="No doctor schedules found."
      sorting={{ state: optimisticSortingState, onSortingChange: handleSortingChange }}
      pagination={{ state: optimisticPaginationState, onPaginationChange: handlePaginationChange }}
      search={{
        initialValue: searchTermFromUrl,
        placeholder: "Search by doctor name or email...",
        debounceMs: 700,
        onDebouncedChange: handleDebouncedSearchChange,
      }}
      meta={meta}
    />
  )
}

export default DoctorSchedulesTable
