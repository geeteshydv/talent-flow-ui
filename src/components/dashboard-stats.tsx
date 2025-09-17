import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, FileText, Calendar, Eye } from "lucide-react"

const stats = [
  {
    title: "Applications Sent",
    value: "24",
    change: "+12%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Profile Views",
    value: "156",
    change: "+23%",
    changeType: "positive" as const,
    icon: Eye,
  },
  {
    title: "Interviews Scheduled",
    value: "3",
    change: "+1",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Response Rate",
    value: "68%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-sm text-accent font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
