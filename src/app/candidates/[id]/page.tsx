"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HRDashboardHeader } from "@/components/hr-dashboard-header"
import { ArrowLeft, Star, MapPin, Calendar, Download, MessageSquare, Phone, Mail } from "lucide-react"
import { Textarea } from "@/components/ui/textArea"
import { useNavigate } from "react-router-dom"

export default function CandidateDetailPage() {
  const candidate = {
    id: 1,
    name: "Alex Chen",
    email: "alex.chen@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    avatar: "/professional-headshot.png",
    experience: "5 years",
    status: "Under Review",
    matchScore: 92,
    appliedDate: "2024-01-18",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Jest", "Webpack"],
    education: "BS Computer Science, Stanford University (2019)",
    currentCompany: "TechCorp Inc.",
    currentRole: "Frontend Developer",
    salary: "$140k",
    expectedSalary: "$160k - $180k",
    noticePeriod: "2 weeks",
    portfolio: "https://alexchen.dev",
    linkedin: "https://linkedin.com/in/alexchen",
    github: "https://github.com/alexchen",
    summary:
      "Experienced frontend developer with a passion for creating intuitive user interfaces and scalable web applications. Proven track record of leading development teams and delivering high-quality products.",
    workExperience: [
      {
        company: "TechCorp Inc.",
        role: "Senior Frontend Developer",
        duration: "2022 - Present",
        description:
          "Lead frontend development for the main product, managing a team of 3 developers. Implemented new features that increased user engagement by 40%.",
      },
      {
        company: "StartupXYZ",
        role: "Frontend Developer",
        duration: "2020 - 2022",
        description:
          "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.",
      },
      {
        company: "WebDev Agency",
        role: "Junior Developer",
        duration: "2019 - 2020",
        description:
          "Built websites for various clients using modern web technologies. Gained experience in full-stack development and client communication.",
      },
    ],
    notes: "Strong technical background, excellent communication skills. Shows great potential for leadership roles.",
  }
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <HRDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon"  onClick={() => navigate('/hr/candidates')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Candidate Profile</h1>
            <p className="text-muted-foreground">Detailed view of candidate information</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
            <Button className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                    <AvatarFallback>
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold">{candidate.name}</h2>
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{candidate.matchScore}% Match</span>
                          </div>
                        </div>
                        <p className="text-lg text-primary font-medium">{candidate.position}</p>
                        <p className="text-muted-foreground">
                          {candidate.currentRole} at {candidate.currentCompany}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">{candidate.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Applied {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{candidate.summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.workExperience.map((job, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{job.role}</h4>
                      <span className="text-sm text-muted-foreground">{job.duration}</span>
                    </div>
                    <p className="text-primary font-medium">{job.company}</p>
                    <p className="text-muted-foreground text-sm">{job.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add your notes about this candidate..."
                  defaultValue={candidate.notes}
                  rows={4}
                />
                <Button size="sm">Save Notes</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="interview">Schedule Interview</SelectItem>
                    <SelectItem value="rejected">Reject</SelectItem>
                    <SelectItem value="hired">Hire</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">Schedule Interview</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Send Email
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Add to Shortlist
                </Button>
              </CardContent>
            </Card>

            {/* Candidate Details */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Experience:</span>
                  <p>{candidate.experience}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Education:</span>
                  <p>{candidate.education}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Current Salary:</span>
                  <p>{candidate.salary}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Expected Salary:</span>
                  <p>{candidate.expectedSalary}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Notice Period:</span>
                  <p>{candidate.noticePeriod}</p>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href={candidate.portfolio} target="_blank" rel="noopener noreferrer">
                    Portfolio
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href={candidate.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
