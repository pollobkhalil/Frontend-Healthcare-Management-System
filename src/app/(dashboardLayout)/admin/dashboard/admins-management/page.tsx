import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { Shield } from "lucide-react"

const AdminsManagementPage = () => {
  return (
    <FeatureComingSoon
      icon={Shield}
      title="Admins Management"
      description="Managing admin accounts needs a backend endpoint (e.g. GET/POST /users/admins) that isn't in the current API collection yet. This page will connect automatically once it's available."
    />
  )
}

export default AdminsManagementPage
