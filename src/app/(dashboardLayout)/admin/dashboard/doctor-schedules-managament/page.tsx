import DoctorSchedulesTable from "@/components/modules/Admin/DoctorSchedulesManagement/DoctorSchedulesTable"
import { getAllDoctorSchedules } from "@/services/doctorSchedule.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const DoctorSchedulesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const queryParamsObjects = await searchParams

  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key]
      if (value === undefined) return ""
      if (Array.isArray(value)) {
        return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join("&")
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .filter(Boolean)
    .join("&")

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["doctor-schedules", "all", queryString],
    queryFn: () => getAllDoctorSchedules(queryString),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorSchedulesTable initialQueryString={queryString} />
    </HydrationBoundary>
  )
}

export default DoctorSchedulesManagementPage
