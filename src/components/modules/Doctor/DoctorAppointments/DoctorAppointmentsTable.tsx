"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { getMyAppointments } from "@/services/appointment.services"
import { type IAppointment } from "@/types/appointment.types"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { doctorAppointmentsColumns } from "./doctorAppointmentsColumns"
import ViewDoctorAppointmentDialog from "./ViewDoctorAppointmentDialog"

const DoctorAppointmentsTable = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const { viewingItem, isViewDialogOpen, onViewOpenChange, tableActions } = useRowActionModalState<IAppointment>({
    enableEdit: false,
    enableDelete: false,
  })

  const { data: appointmentsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["appointments", "mine"],
    queryFn: () => getMyAppointments(),
  })

  const allAppointments = appointmentsResponse?.data ?? []

  const filteredAppointments = useMemo(() => {
    if (!searchTerm.trim()) {
      return allAppointments
    }

    const lowerSearchTerm = searchTerm.trim().toLowerCase()
    return allAppointments.filter((appointment) => {
      const patientName = appointment.patient?.name?.toLowerCase() || ""
      const patientEmail = appointment.patient?.email?.toLowerCase() || ""
      return patientName.includes(lowerSearchTerm) || patientEmail.includes(lowerSearchTerm)
    })
  }, [allAppointments, searchTerm])

  return (
    <>
      <DataTable
        data={filteredAppointments}
        columns={doctorAppointmentsColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="You have no appointments yet."
        search={{
          initialValue: searchTerm,
          placeholder: "Search by patient name or email...",
          debounceMs: 400,
          onDebouncedChange: setSearchTerm,
        }}
        actions={tableActions}
      />

      <ViewDoctorAppointmentDialog open={isViewDialogOpen} onOpenChange={onViewOpenChange} appointment={viewingItem} />
    </>
  )
}

export default DoctorAppointmentsTable
