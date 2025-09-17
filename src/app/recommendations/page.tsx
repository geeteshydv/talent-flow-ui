"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HRDashboardHeader } from "@/components/hr-dashboard-header"
import { Star, TrendingUp, Users, Eye, MessageSquare, Calendar, Filter } from "lucide-react"

export default function RecommendationsPage() {
  const [selectedJob, setSelectedJob] = useState("frontend-dev")
  const [sortBy, setSortBy] = useState("match-score")

  const jobs = [
    { id: "frontend-dev", title: "Senior Frontend Developer", department: "Engineering" },
    { id: "product-manager", title: "Product Manager", department: "Product" },
    { id: "ux-designer", title: "UX Designer", department: "Design" },
    { id: "data-analyst", title: "Data Analyst", department: "Analytics" },
  ]

  const recommendations = [
    {
      id: 1,
      name: "Alex Chen",
      email: "alex.chen@email.com",
      avatar: "/professional-headshot.png",
      currentRole: "Frontend Developer",
      currentCompany: "TechCorp Inc.",
      experience: "5 years",
      matchScore: 95,
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      education: "BS Computer Science, Stanford",
      salary: "$140k",
      availability: "2 weeks notice",
      lastActive: "2 days ago",
      source: "Previous Application",
      notes: "Applied to similar role 6 months ago, strong technical background",
      reasons: [
        "95% skill match with job requirements",
        "5+ years experience in React and TypeScript",
        "Previously showed interest in similar roles",
        "Located in target area",
      ],
    },
    {
      id: 2,
      name: "Jordan Smith",
      email: "jordan.smith@email.com",
      avatar: "/professional-headshot.png",
      currentRole: "Senior React Developer",
      currentCompany: "StartupXYZ",
      experience: "6 years",
      matchScore: 92,
      location: "Remote",
      skills: ["React", "Vue.js", "JavaScript", "Python", "Docker"],
      education: "MS Computer Science, MIT",
      salary: "$150k",
      availability: "1 month notice",
      lastActive: "1 week ago",
      source: "LinkedIn Profile",
      notes: "Strong open source contributions, active in tech community",
      reasons: [
        "92% skill match with job requirements",
        "6+ years experience in frontend development",
        "Strong open source portfolio",
        "Available for remote work",
      ],
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      avatar: "/professional-woman-headshot.png",
      currentRole: "Full Stack Developer",
      currentCompany: "WebDev Corp",
      experience: "4 years",
      matchScore: 88,
      location: "Austin, TX",
      skills: ["React", "Angular", "Node.js", "MongoDB", "AWS"],
      education: "BS Software Engineering, UT Austin",
      salary: "$120k",
      availability: "3 weeks notice",
      lastActive: "3 days ago",
      source: "Referral",
      notes: "Referred by current employee, excellent problem-solving skills",
      reasons: [
        "88% skill match with job requirements",
        "4+ years full-stack experience",
        "Internal employee referral",
        "Strong problem-solving abilities",
      ],
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      avatar: "/professional-man-headshot.png",
      currentRole: "Frontend Engineer",
      currentCompany: "Design Studio",
      experience: "3 years",
      matchScore: 85,
      location: "Seattle, WA",
      skills: ["React", "TypeScript", "CSS", "Figma", "Jest"],
      education: "BS Computer Science, UW",
      salary: "$110k",
      availability: "2 weeks notice",
      lastActive: "1 day ago",
      source: "Job Board Profile",
      notes: "Strong design sense, good collaboration with design teams",
      reasons: [
        "85% skill match with job requirements",
        "3+ years React experience",
        "Strong design collaboration skills",
        "Recently active on job platforms",
      ],
    },
  ]

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50"
    if (score >= 80) return "text-blue-600 bg-blue-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case "Previous Application":
        return "bg-purple-100 text-purple-800"
      case "LinkedIn Profile":
        return "bg-blue-100 text-blue-800"
      case "Referral":
        return "bg-green-100 text-green-800"
      case "Job Board Profile":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const selectedJobTitle = jobs.find((job) => job.id === selectedJob)?.title || "Select a job"

  return (
    <div className="min-h-screen bg-background">
      <HRDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Candidate Recommendations</h1>
            <p className="text-muted-foreground">AI-powered candidate matching for your open positions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <TrendingUp className="w-4 h-4" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Recommendations</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <Users className="w-8 h-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Match (90%+)</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Star className="w-8 h-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recently Active</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <TrendingUp className="w-8 h-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contacted</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <MessageSquare className="w-8 h-8 text-chart-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select job position" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match-score">Match Score</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="last-active">Last Active</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Selection Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recommendations for: {selectedJobTitle}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-6">
          {recommendations.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
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
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(
                              candidate.matchScore,
                            )}`}
                          >
                            {candidate.matchScore}% Match
                          </div>
                        </div>
                        <p className="text-muted-foreground">{candidate.email}</p>
                        <p className="font-medium text-primary">
                          {candidate.currentRole} at {candidate.currentCompany}
                        </p>
                      </div>
                      <Badge className={getSourceColor(candidate.source)}>{candidate.source}</Badge>
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
                        <span className="font-medium text-muted-foreground">Availability:</span>
                        <p>{candidate.availability}</p>
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

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Why recommended:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {candidate.reasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {candidate.notes && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Notes:</p>
                        <p className="text-sm text-muted-foreground">{candidate.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">Last active: {candidate.lastActive}</div>
                      <div className="flex items-center gap-3">
                        <Button size="sm" className="gap-2">
                          <Eye className="w-4 h-4" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <MessageSquare className="w-4 h-4" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Calendar className="w-4 h-4" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recommendations.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recommendations found for the selected position.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters or check back later for new matches.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
