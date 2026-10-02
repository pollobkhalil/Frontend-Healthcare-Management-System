import { getUserInfo } from "@/services/auth.services"
import PublicNavbarContent from "./PublicNavbarContent"

const PublicNavbar = async () => {
  const userInfo = await getUserInfo()

  return <PublicNavbarContent userInfo={userInfo} />
}

export default PublicNavbar
