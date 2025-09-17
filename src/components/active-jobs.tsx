import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export function ActiveJobs() {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      applications: 23,
      status: "Active",
      posted: "3 days ago",
    },
    {
      title: "Product Manager",
      department: "Product",
      applications: 15,
      status: "Active",
      posted: "1 week ago",
    },
    {
      title: "UX Designer",
      department: "Design",
      applications: 31,
      status: "Active",
      posted: "5 days ago",
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      applications: 8,
      status: "Draft",
      posted: "Today",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Active Job Postings</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-1">
              <h4 className="font-medium text-sm">{job.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.applications} applications</span>
                <span>•</span>
                <span>{job.posted}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
