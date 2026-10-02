import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { FileText } from "lucide-react"

const DoctorPrescriptionsPage = () => {
  return (
    <FeatureComingSoon
      icon={FileText}
      title="Prescriptions"
      description="No /prescriptions endpoints are in the current API collection yet. Note: IDoctorAppointmentItem already has a prescription field — once a create/list endpoint exists, this can attach directly to each completed appointment."
    />
  )
}

export default DoctorPrescriptionsPage
