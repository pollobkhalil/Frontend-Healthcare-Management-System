import DoctorAppointmentsTable from "@/components/modules/Doctor/DoctorAppointments/DoctorAppointmentsTable"
import { getMyAppointments } from "@/services/appointment.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const DoctorAppointmentsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["appointments", "mine"],
    queryFn: () => getMyAppointments(),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 15,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorAppointmentsTable />
    </HydrationBoundary>
  )
}

export default DoctorAppointmentsPage
