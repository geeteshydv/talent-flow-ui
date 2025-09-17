"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HRDashboardHeader } from "@/components/hr-dashboard-header"
import { Calendar, Clock, Video, MapPin, Plus, Filter, Users, MessageSquare } from "lucide-react"

export default function InterviewsPage() {
  const [viewMode, setViewMode] = useState("upcoming")
  const [filterBy, setFilterBy] = useState("all")

  const interviews = [
    {
      id: 1,
      candidate: "Alex Chen",
      position: "Senior Frontend Developer",
      avatar: "/professional-headshot.png",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "45 min",
      type: "Video Call",
      interviewer: "Jennifer Smith",
      round: "Technical Round",
      status: "Scheduled",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notes: "Focus on React and TypeScript experience",
    },
    {
      id: 2,
      candidate: "Sarah Johnson",
      position: "Product Manager",
      avatar: "/professional-woman-headshot.png",
      date: "2024-01-20",
      time: "2:30 PM",
      duration: "60 min",
      type: "In-Person",
      interviewer: "David Kim",
      round: "Final Round",
      status: "Scheduled",
      location: "Conference Room A",
      notes: "Product strategy discussion and culture fit",
    },
    {
      id: 3,
      candidate: "Michael Rodriguez",
      position: "UX Designer",
      avatar: "/professional-man-headshot.png",
      date: "2024-01-19",
      time: "4:00 PM",
      duration: "30 min",
      type: "Video Call",
      interviewer: "Lisa Wang",
      round: "Portfolio Review",
      status: "Completed",
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
      feedback: "Strong portfolio, excellent design thinking process",
      rating: 4,
    },
    {
      id: 4,
      candidate: "Emily Davis",
      position: "Data Analyst",
      avatar: "/professional-woman-headshot-glasses.png",
      date: "2024-01-18",
      time: "11:00 AM",
      duration: "45 min",
      type: "Video Call",
      interviewer: "Mark Thompson",
      round: "Technical Assessment",
      status: "Completed",
      feedback: "Good technical skills but needs more experience with advanced analytics",
      rating: 3,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Rescheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoundColor = (round: string) => {
    switch (round) {
      case "Screening":
        return "bg-purple-100 text-purple-800"
      case "Technical Round":
        return "bg-blue-100 text-blue-800"
      case "Portfolio Review":
        return "bg-green-100 text-green-800"
      case "Final Round":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredInterviews = interviews.filter((interview) => {
    if (viewMode === "upcoming") return interview.status === "Scheduled"
    if (viewMode === "completed") return interview.status === "Completed"
    if (viewMode === "today") return interview.date === "2024-01-20"
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <HRDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Interview Management</h1>
            <p className="text-muted-foreground">Schedule and track candidate interviews</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Schedule Interview
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Interviews</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Calendar className="w-8 h-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Clock className="w-8 h-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <Users className="w-8 h-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">4.2</p>
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
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interviews</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rounds</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="final">Final Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Interviews List */}
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.candidate} />
                    <AvatarFallback>
                      {interview.candidate
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{interview.candidate}</h3>
                        <p className="text-muted-foreground">{interview.position}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoundColor(interview.round)}>{interview.round}</Badge>
                        <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(interview.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {interview.time} ({interview.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {interview.type === "Video Call" ? (
                          <Video className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span>{interview.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{interview.interviewer}</span>
                      </div>
                    </div>

                    {interview.notes && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Notes:</p>
                        <p className="text-sm text-muted-foreground">{interview.notes}</p>
                      </div>
                    )}

                    {interview.feedback && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Feedback:</p>
                        <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                        {interview.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm font-medium">Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${i < interview.rating ? "text-yellow-400" : "text-gray-300"}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      {interview.status === "Scheduled" && (
                        <>
                          {interview.type === "Video Call" ? (
                            <Button size="sm" className="gap-2">
                              <Video className="w-4 h-4" />
                              Join Call
                            </Button>
                          ) : (
                            <Button size="sm" className="gap-2">
                              <MapPin className="w-4 h-4" />
                              View Location
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Cancel
                          </Button>
                        </>
                      )}
                      {interview.status === "Completed" && (
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <MessageSquare className="w-4 h-4" />
                          View Feedback
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInterviews.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No interviews found for the selected criteria.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
