import SpecialtiesTable from "@/components/modules/Admin/SpecialtiesManagement/SpecialtiesTable"
import { getAllSpecialties } from "@/services/specialty.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const SpecialtiesManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["specialties"],
    queryFn: () => getAllSpecialties(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SpecialtiesTable />
    </HydrationBoundary>
  )
}

export default SpecialtiesManagementPage
