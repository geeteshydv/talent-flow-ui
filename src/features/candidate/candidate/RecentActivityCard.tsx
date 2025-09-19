import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Calendar, MessageSquare } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "application",
    title: "Applied to Frontend Developer at TechCorp",
    time: "2 hours ago",
    status: "pending",
    icon: FileText,
  },
  {
    id: 2,
    type: "view",
    title: "Your profile was viewed by StartupXYZ",
    time: "5 hours ago",
    status: "info",
    icon: Eye,
  },
  {
    id: 3,
    type: "interview",
    title: "Interview scheduled with Design Studio",
    time: "1 day ago",
    status: "success",
    icon: Calendar,
  },
  {
    id: 4,
    type: "message",
    title: "New message from recruiter at InnovateInc",
    time: "2 days ago",
    status: "info",
    icon: MessageSquare,
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  success: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
}

export const RecentActivityCard = ()  => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="secondary" className={statusColors[activity.status as keyof typeof statusColors]}>
                {activity.status}
              </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
