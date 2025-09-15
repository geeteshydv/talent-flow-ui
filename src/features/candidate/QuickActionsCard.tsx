import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, FileText, User, Settings } from "lucide-react"

const quickActions = [
  {
    title: "Browse Jobs",
    description: "Find new opportunities",
    icon: Search,
    action: "browse",
  },
  {
    title: "Update Resume",
    description: "Keep your profile current",
    icon: FileText,
    action: "resume",
  },
  {
    title: "Edit Profile",
    description: "Manage your information",
    icon: User,
    action: "profile",
  },
  {
    title: "Job Preferences",
    description: "Update your criteria",
    icon: Settings,
    action: "preferences",
  },
]

export const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Button key={action.action} variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
