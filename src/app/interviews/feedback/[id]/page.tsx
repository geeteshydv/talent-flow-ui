"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HRDashboardHeader } from "@/components/hr-dashboard-header"
import { ArrowLeft, Star, Save, Send } from "lucide-react"

export default function InterviewFeedbackPage() {
  const [rating, setRating] = useState("")
  const [recommendation, setRecommendation] = useState("")
  const [feedback, setFeedback] = useState("")

  const interview = {
    id: 1,
    candidate: "Alex Chen",
    position: "Senior Frontend Developer",
    avatar: "/professional-headshot.png",
    date: "2024-01-19",
    time: "10:00 AM",
    duration: "45 min",
    type: "Video Call",
    interviewer: "Jennifer Smith",
    round: "Technical Round",
  }

  const criteria = [
    { name: "Technical Skills", rating: 0 },
    { name: "Problem Solving", rating: 0 },
    { name: "Communication", rating: 0 },
    { name: "Cultural Fit", rating: 0 },
    { name: "Experience Level", rating: 0 },
  ]

  const [criteriaRatings, setCriteriaRatings] = useState(criteria)

  const updateCriteriaRating = (index: number, rating: number) => {
    const updated = [...criteriaRatings]
    updated[index].rating = rating
    setCriteriaRatings(updated)
  }

  return (
    <div className="min-h-screen bg-background">
      <HRDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Interview Feedback</h1>
            <p className="text-muted-foreground">Provide feedback for the completed interview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interview Details */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.candidate} />
                    <AvatarFallback>
                      {interview.candidate
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{interview.candidate}</h3>
                    <p className="text-muted-foreground">{interview.position}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{new Date(interview.date).toLocaleDateString()}</span>
                      <span>{interview.time}</span>
                      <Badge variant="outline">{interview.round}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {criteriaRatings.map((criterion, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-sm font-medium">{criterion.name}</Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => updateCriteriaRating(index, star)}
                          className={`w-8 h-8 ${
                            star <= criterion.rating ? "text-yellow-400" : "text-gray-300"
                          } hover:text-yellow-400 transition-colors`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {criterion.rating > 0 ? `${criterion.rating}/5` : "Not rated"}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={rating} onValueChange={setRating}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="r5" />
                    <Label htmlFor="r5">Excellent (5/5) - Exceeds expectations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4">Good (4/5) - Meets expectations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3">Average (3/5) - Partially meets expectations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">Below Average (2/5) - Does not meet expectations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">Poor (1/5) - Well below expectations</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Interview Notes & Comments</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Provide detailed feedback about the candidate's performance, strengths, areas for improvement, and any notable observations..."
                    rows={6}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={recommendation} onValueChange={setRecommendation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your recommendation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strong-hire">Strong Hire - Definitely recommend</SelectItem>
                    <SelectItem value="hire">Hire - Recommend with confidence</SelectItem>
                    <SelectItem value="maybe">Maybe - On the fence, needs discussion</SelectItem>
                    <SelectItem value="no-hire">No Hire - Do not recommend</SelectItem>
                    <SelectItem value="strong-no-hire">Strong No Hire - Definitely do not recommend</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gap-2">
                  <Save className="w-4 h-4" />
                  Save Feedback
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Send className="w-4 h-4" />
                  Submit & Notify Team
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Schedule Next Round
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Send Rejection Email
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Add to Talent Pool
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Be Specific</h4>
                  <p className="text-muted-foreground">Provide concrete examples and observations</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Stay Objective</h4>
                  <p className="text-muted-foreground">Focus on job-related skills and behaviors</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Include Both</h4>
                  <p className="text-muted-foreground">Mention strengths and areas for improvement</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
