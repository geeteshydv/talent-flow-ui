import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PostJobForm } from "@/features/hr/PostJobForm"
import { Plus, FileText, Users, Calendar } from "lucide-react"
import { useState } from "react";

export function HRQuickActions() {
   const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  const actions = [
    {
      title: "Post New Job",
      description: "Create a new job posting",
      icon: Plus,
      variant: "default" as const,
    },
    {
      title: "Review Applications",
      description: "Check pending applications",
      icon: FileText,
      variant: "outline" as const,
    },
    {
      title: "Schedule Interview",
      description: "Book candidate interviews",
      icon: Calendar,
      variant: "outline" as const,
    },
    {
      title: "View All Candidates",
      description: "Browse candidate database",
      icon: Users,
      variant: "outline" as const,
    },
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action, index) => (
            <Button 
              key={index} 
              variant={action.variant} 
              className="w-full justify-start gap-3 h-auto p-4"
              onClick={() => {
                if (action.title === "Post New Job") {
                  setIsPostJobOpen(true);
                }
              }}
            >
              <action.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
      <PostJobForm 
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
      />
    </>
  )
}
