import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { Activity } from "lucide-react"

const HealthRecordsPage = () => {
  return (
    <FeatureComingSoon
      icon={Activity}
      title="Health Records"
      description="A health-records endpoint isn't in the current API collection yet."
    />
  )
}

export default HealthRecordsPage
