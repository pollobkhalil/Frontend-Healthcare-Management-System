import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { Users } from "lucide-react"

const PatientsManagementPage = () => {
  return (
    <FeatureComingSoon
      icon={Users}
      title="Patients Management"
      description="A patient-listing endpoint (e.g. GET /patients) isn't in the current API collection yet. This page will connect automatically once it's available."
    />
  )
}

export default PatientsManagementPage
