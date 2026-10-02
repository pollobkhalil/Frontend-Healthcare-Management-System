import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { Star } from "lucide-react"

const ReviewsManagementPage = () => {
  return (
    <FeatureComingSoon
      icon={Star}
      title="Reviews Management"
      description="No /reviews endpoints are in the current API collection yet (your doctor.types.ts already models IDoctorReview — the listing/moderation endpoint just isn't exposed)."
    />
  )
}

export default ReviewsManagementPage
