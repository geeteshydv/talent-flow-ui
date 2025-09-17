import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, MapPin } from "lucide-react"

export function InterviewSchedule() {
  const interviews = [
    {
      candidate: "Alex Chen",
      position: "Senior Frontend Developer",
      avatar: "/professional-headshot.png",
      time: "10:00 AM",
      duration: "45 min",
      type: "Video Call",
      interviewer: "You",
      status: "Upcoming",
    },
    {
      candidate: "Sarah Johnson",
      position: "Product Manager",
      avatar: "/professional-woman-headshot.png",
      time: "2:30 PM",
      duration: "60 min",
      type: "In-Person",
      interviewer: "David Kim",
      status: "Upcoming",
    },
    {
      candidate: "Michael Rodriguez",
      position: "UX Designer",
      avatar: "/professional-man-headshot.png",
      time: "4:00 PM",
      duration: "30 min",
      type: "Video Call",
      interviewer: "Lisa Wang",
      status: "Upcoming",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Today's Interview Schedule</CardTitle>
        <Button variant="ghost" size="sm">
          View Calendar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {interviews.map((interview, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-sm font-medium">{interview.time}</div>
                <div className="text-xs text-muted-foreground">{interview.duration}</div>
              </div>

              <Avatar className="w-10 h-10">
                <AvatarImage src={interview.avatar || "/placeholder.svg"} alt={interview.candidate} />
                <AvatarFallback>
                  {interview.candidate
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{interview.candidate}</h4>
                <Badge variant="outline" className="text-xs">
                  {interview.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{interview.position}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  {interview.type === "Video Call" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                  <span>{interview.type}</span>
                </div>
                <span>Interviewer: {interview.interviewer}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Join Call
              </Button>
              <Button variant="ghost" size="sm">
                Reschedule
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
