import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, ArrowRight } from "lucide-react"

const profileSteps = [
  { title: "Basic Information", completed: true },
  { title: "Work Experience", completed: true },
  { title: "Skills & Certifications", completed: true },
  { title: "Portfolio & Projects", completed: false },
  { title: "Preferences & Salary", completed: false },
]

export function ProfileCompletion() {
  const completedSteps = profileSteps.filter((step) => step.completed).length
  const completionPercentage = (completedSteps / profileSteps.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Profile Completion
          <span className="text-sm font-normal text-muted-foreground">
            {completedSteps}/{profileSteps.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          {profileSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-accent" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className={`text-sm ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <Button className="w-full bg-transparent" variant="outline">
          Complete Profile
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
