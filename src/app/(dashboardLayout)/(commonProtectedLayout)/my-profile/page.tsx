import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfo } from "@/services/auth.services";
import { Mail, ShieldCheck, ShieldX, UserRound } from "lucide-react";

interface IMeResponse {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  image?: string;
  status?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

const getInitials = (name?: string) => {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

const MyProfilePage = async () => {
  const userInfo: IMeResponse | null = await getUserInfo();

  if (!userInfo) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-10 text-center text-muted-foreground">
          Unable to load your profile. Please try logging in again.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userInfo.image || undefined} alt={userInfo.name || "User"} />
            <AvatarFallback className="text-lg">{getInitials(userInfo.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{userInfo.name || "Unnamed User"}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Mail className="size-3.5" /> {userInfo.email}
            </p>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <UserRound className="size-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="text-sm font-medium capitalize">{userInfo.role?.toLowerCase().replace("_", " ") || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-3">
            {userInfo.emailVerified ? (
              <ShieldCheck className="size-5 text-emerald-600" />
            ) : (
              <ShieldX className="size-5 text-destructive" />
            )}
            <div>
              <p className="text-xs text-muted-foreground">Email Verification</p>
              <p className="text-sm font-medium">{userInfo.emailVerified ? "Verified" : "Not Verified"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-3 sm:col-span-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Status</p>
              <Badge variant={userInfo.status === "ACTIVE" ? "default" : "destructive"}>
                {userInfo.status || "UNKNOWN"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        Profile editing isn&apos;t available yet — the backend API doesn&apos;t expose an update-profile endpoint.
      </p>
    </div>
  );
};

export default MyProfilePage;
