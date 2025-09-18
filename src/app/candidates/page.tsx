"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HRDashboardHeader } from "@/components/hr-dashboard-header"
import { Search, Filter, Star, MessageSquare, Calendar, Download, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function HRCandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")

  const candidates = [
    {
      id: 1,
      name: "Alex Chen",
      email: "alex.chen@email.com",
      position: "Senior Frontend Developer",
      avatar: "/professional-headshot.png",
      experience: "5 years",
      status: "Under Review",
      matchScore: 92,
      appliedDate: "2024-01-18",
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      education: "BS Computer Science, Stanford University",
      currentCompany: "TechCorp Inc.",
      salary: "$140k",
      notes: "Strong technical background, excellent communication skills",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      position: "Product Manager",
      avatar: "/professional-woman-headshot.png",
      experience: "7 years",
      status: "Interview Scheduled",
      matchScore: 88,
      appliedDate: "2024-01-17",
      location: "Remote",
      skills: ["Product Strategy", "Agile", "Analytics", "User Research", "SQL"],
      education: "MBA, Harvard Business School",
      currentCompany: "StartupXYZ",
      salary: "$160k",
      notes: "Proven track record in product growth, great leadership skills",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@email.com",
      position: "UX Designer",
      avatar: "/professional-man-headshot.png",
      experience: "4 years",
      status: "New",
      matchScore: 85,
      appliedDate: "2024-01-18",
      location: "New York, NY",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "HTML/CSS"],
      education: "BFA Design, Parsons School of Design",
      currentCompany: "Design Studio LLC",
      salary: "$110k",
      notes: "Creative portfolio, strong user-centered design approach",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      position: "Data Analyst",
      avatar: "/professional-woman-headshot-glasses.png",
      experience: "3 years",
      status: "Rejected",
      matchScore: 75,
      appliedDate: "2024-01-15",
      location: "Chicago, IL",
      skills: ["Python", "SQL", "Tableau", "Statistics", "Machine Learning"],
      education: "MS Data Science, University of Chicago",
      currentCompany: "Analytics Corp",
      salary: "$95k",
      notes: "Good technical skills but lacks domain experience",
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
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Hired":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || candidate.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPosition =
      positionFilter === "all" || candidate.position.toLowerCase().includes(positionFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesPosition
  })

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <HRDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Candidate Review</h1>
            <p className="text-muted-foreground">Review and manage candidate applications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates by name, email, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="interview scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="product">Product Manager</SelectItem>
                  <SelectItem value="designer">UX Designer</SelectItem>
                  <SelectItem value="data">Data Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-16 h-16">
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
                          <h3 className="text-xl font-semibold">{candidate.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{candidate.matchScore}%</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{candidate.email}</p>
                        <p className="font-medium text-primary">{candidate.position}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Experience:</span>
                        <p>{candidate.experience}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Location:</span>
                        <p>{candidate.location}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Current Salary:</span>
                        <p>{candidate.salary}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Applied:</span>
                        <p>{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Education:</span>
                        <p>{candidate.education}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Current Company:</span>
                        <p>{candidate.currentCompany}</p>
                      </div>
                    </div>

                    {candidate.notes && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Notes:</span>
                        <p className="text-sm text-muted-foreground mt-1">{candidate.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      <Button size="sm" className="gap-2" onClick={() => navigate('/hr/viewProfile')}>
                        <Eye className="w-4 h-4" />
                        View Full Profile
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Calendar className="w-4 h-4" />
                        Schedule Interview
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <MessageSquare className="w-4 h-4" />
                        Send Message
                      </Button>
                      <Select>
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-review">Under Review</SelectItem>
                          <SelectItem value="interview">Schedule Interview</SelectItem>
                          <SelectItem value="rejected">Reject</SelectItem>
                          <SelectItem value="hired">Hire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No candidates found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
