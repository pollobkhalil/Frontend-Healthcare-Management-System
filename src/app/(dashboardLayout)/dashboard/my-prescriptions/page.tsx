import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { FileText } from "lucide-react"

const MyPrescriptionsPage = () => {
  return (
    <FeatureComingSoon
      icon={FileText}
      title="My Prescriptions"
      description="A patient-facing prescriptions endpoint isn't in the current API collection yet."
    />
  )
}

export default MyPrescriptionsPage
