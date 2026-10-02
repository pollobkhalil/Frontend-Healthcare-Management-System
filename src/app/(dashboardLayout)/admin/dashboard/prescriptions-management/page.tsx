import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { FileText } from "lucide-react"

const PrescriptionsManagementPage = () => {
  return (
    <FeatureComingSoon
      icon={FileText}
      title="Prescriptions Management"
      description="No /prescriptions endpoints are in the current API collection yet. Once the backend exposes prescription CRUD, this table can be wired up the same way as Specialties/Appointments."
    />
  )
}

export default PrescriptionsManagementPage
