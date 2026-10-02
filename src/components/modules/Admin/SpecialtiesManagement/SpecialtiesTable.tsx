"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { getAllSpecialties } from "@/services/specialty.services"
import { type ISpecialty } from "@/types/specialty.types"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import CreateSpecialtyFormModal from "./CreateSpecialtyFormModal"
import DeleteSpecialtyConfirmationDialog from "./DeleteSpecialtyConfirmationDialog"
import { specialtiesColumns } from "./specialtiesColumns"

const SpecialtiesTable = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const { deletingItem, isDeleteDialogOpen, onDeleteOpenChange, tableActions } = useRowActionModalState<ISpecialty>({
    enableView: false,
    enableEdit: false,
  })

  const { data: specialtiesResponse, isLoading, isFetching } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => getAllSpecialties(),
  })

  const allSpecialties = specialtiesResponse?.data ?? []

  const filteredSpecialties = useMemo(() => {
    if (!searchTerm.trim()) {
      return allSpecialties
    }

    const lowerSearchTerm = searchTerm.trim().toLowerCase()
    return allSpecialties.filter((specialty) => specialty.title.toLowerCase().includes(lowerSearchTerm))
  }, [allSpecialties, searchTerm])

  return (
    <>
      <DataTable
        data={filteredSpecialties}
        columns={specialtiesColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No specialties found."
        search={{
          initialValue: searchTerm,
          placeholder: "Search specialty by title...",
          debounceMs: 300,
          onDebouncedChange: setSearchTerm,
        }}
        toolbarAction={<CreateSpecialtyFormModal />}
        actions={tableActions}
      />

      <DeleteSpecialtyConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        specialty={deletingItem}
      />
    </>
  )
}

export default SpecialtiesTable
