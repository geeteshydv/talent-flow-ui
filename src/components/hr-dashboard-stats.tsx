import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Calendar, TrendingUp } from "lucide-react"

export function HRDashboardStats() {
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      change: "+2 this week",
      icon: Briefcase,
      color: "text-chart-1",
    },
    {
      title: "New Applications",
      value: "47",
      change: "+12 today",
      icon: Users,
      color: "text-chart-2",
    },
    {
      title: "Interviews Scheduled",
      value: "8",
      change: "3 today",
      icon: Calendar,
      color: "text-chart-3",
    },
    {
      title: "Positions Filled",
      value: "5",
      change: "+1 this week",
      icon: TrendingUp,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
