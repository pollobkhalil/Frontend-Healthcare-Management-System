import FeatureComingSoon from "@/components/shared/FeatureComingSoon"
import { CreditCard } from "lucide-react"

const PaymentsManagementPage = () => {
  return (
    <FeatureComingSoon
      icon={CreditCard}
      title="Payments Management"
      description="Your API only exposes /appointments/initiate-payment/:id — there's no admin-facing payments listing endpoint yet. This page will connect automatically once one is added."
    />
  )
}

export default PaymentsManagementPage
