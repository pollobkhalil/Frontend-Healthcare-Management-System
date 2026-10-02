import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Construction, type LucideIcon } from "lucide-react"

interface FeatureComingSoonProps {
  title: string
  description?: string
  icon?: LucideIcon
}

const FeatureComingSoon = ({ title, description, icon: Icon = Construction }: FeatureComingSoonProps) => {
  return (
    <Card className="mx-auto max-w-xl">
      <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Icon className="size-8 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            {description ||
              "This feature is being built and will be available once the corresponding backend API is ready."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default FeatureComingSoon
