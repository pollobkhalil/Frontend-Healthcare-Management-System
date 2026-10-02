import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { Star } from "lucide-react"

const DoctorMyReviewsPage = () => {
  return (
    <FeatureComingSoon
      icon={Star}
      title="My Reviews"
      description="A doctor-facing reviews endpoint isn't in the current API collection yet. Note: your IDoctorDetails type already has a reviews[] field returned from GET /doctors/:id — a dedicated GET /doctors/my-reviews would let this page reuse the same pattern as My Appointments."
    />
  )
}

export default DoctorMyReviewsPage
