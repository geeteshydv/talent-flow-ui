import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react"

const recommendedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    match: 95,
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    posted: "1 day ago",
    match: 88,
    skills: ["Node.js", "React", "PostgreSQL"],
  },
  {
    id: 3,
    title: "UI/UX Developer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80/hour",
    posted: "3 days ago",
    match: 82,
    skills: ["Figma", "React", "CSS"],
  },
]

export function JobRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recommended Jobs
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendedJobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-muted-foreground">{job.company}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  {job.match}% match
                </Badge>
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{job.posted}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
