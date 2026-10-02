import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { Stethoscope } from "lucide-react"

const DoctorSpecialtiesManagementPage = () => {
  return (
    <FeatureComingSoon
      icon={Stethoscope}
      title="Doctor Specialties Management"
      description="Heads up: assigning/removing specialties per doctor is already handled today from Doctors Management (Edit Doctor). This standalone nav item has no dedicated endpoint — consider removing it from navItems.ts, or point it to a future bulk-reassignment API."
    />
  )
}

export default DoctorSpecialtiesManagementPage
