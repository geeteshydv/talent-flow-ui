import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageSquare } from "lucide-react"
import { useState } from "react"
import { ApplicantProfileView } from "@/features/hr/ApplicantProfileView"

export function RecentApplications() {
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const applications = [
    {
      name: "Alex Chen",
      position: "Senior Frontend Developer",
      avatar: "/professional-headshot.png",
      experience: "5 years",
      status: "Under Review",
      matchScore: 92,
      appliedDate: "2 hours ago",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      name: "Sarah Johnson",
      position: "Product Manager",
      avatar: "/professional-woman-headshot.png",
      experience: "7 years",
      status: "Interview Scheduled",
      matchScore: 88,
      appliedDate: "1 day ago",
      skills: ["Product Strategy", "Agile", "Analytics"],
    },
    {
      name: "Michael Rodriguez",
      position: "UX Designer",
      avatar: "/professional-man-headshot.png",
      experience: "4 years",
      status: "New",
      matchScore: 85,
      appliedDate: "3 hours ago",
      skills: ["Figma", "User Research", "Prototyping"],
    },
    {
      name: "Emily Davis",
      position: "Data Analyst",
      avatar: "/professional-woman-headshot-glasses.png",
      experience: "3 years",
      status: "Under Review",
      matchScore: 90,
      appliedDate: "5 hours ago",
      skills: ["Python", "SQL", "Tableau"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Interview Scheduled":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Applications</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((application, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">

            <Avatar className="w-12 h-12">
              <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.name} />
              <AvatarFallback>
                {application.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{application.name}</h4>
                  <p className="text-sm text-muted-foreground">{application.position}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{application.matchScore}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{application.appliedDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  <span className="text-xs text-muted-foreground">{application.experience} experience</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApplicant(application)}
                  >
                    View Profile
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-1">
                {application.skills.slice(0, 3).map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      {selectedApplicant && (
        <ApplicantProfileView
          isOpen={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          applicant={selectedApplicant}
        />
      )}
    </Card>
  )
}
