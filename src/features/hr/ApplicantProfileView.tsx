import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Mail, Phone, Download, Calendar, MessageSquare } from "lucide-react";

interface ApplicantProfileProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: {
    name: string;
    position: string;
    avatar: string;
    experience: string;
    status: string;
    matchScore: number;
    appliedDate: string;
    skills: string[];
    email?: string;
    phone?: string;
    location?: string;
    education?: {
      degree: string;
      school: string;
      year: string;
    }[];
    workHistory?: {
      position: string;
      company: string;
      duration: string;
      description: string;
    }[];
  };
}

export function ApplicantProfileView({ isOpen, onClose, applicant }: ApplicantProfileProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Applicant Profile</DialogTitle>
        </DialogHeader>
        
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={applicant.avatar} alt={applicant.name} />
              <AvatarFallback>
                {applicant.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{applicant.name}</h2>
                  <p className="text-muted-foreground">{applicant.position}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{applicant.matchScore}% Match</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                {applicant.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {applicant.location}
                  </span>
                )}
                {applicant.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {applicant.email}
                  </span>
                )}
                {applicant.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {applicant.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button className="flex-1">Schedule Interview</Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {applicant.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work History */}
          {applicant.workHistory && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Work Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicant.workHistory.map((work, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-semibold">{work.position}</h3>
                    <p className="text-sm text-muted-foreground">{work.company}</p>
                    <p className="text-sm text-muted-foreground">{work.duration}</p>
                    <p className="mt-2 text-sm">{work.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {applicant.education && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicant.education.map((edu, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}