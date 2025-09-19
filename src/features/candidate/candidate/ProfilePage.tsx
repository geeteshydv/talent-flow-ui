import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Edit } from "lucide-react";
import { useState } from "react";
import { EditProfileForm } from "./EditProfileForm";
import CandidateFeedbackList from "./CandidateFeedbackList";
import { mockCandidateFeedbacks } from "./mockCandidateFeedbacks";

const userProfile = {
    name: "Sarah Johnson",
    title: "Senior Frontend Developer",
    avatarUrl: "https://github.com/shadcn.png",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    about: "I am a passionate Senior Frontend Developer with over 8 years of experience in creating dynamic, responsive, and user-friendly web applications. My expertise lies in the React ecosystem, including Next.js and TypeScript. I thrive in collaborative environments and am always eager to learn new technologies to build better products.",
    skills: ["React", "TypeScript", "Next.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Tailwind CSS", "Node.js", "GraphQL", "Figma"],
    experience: [
        {
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            period: "Jan 2021 - Present",
            description: "Led the development of a new customer-facing dashboard using Next.js and TypeScript, improving user engagement by 25%. Mentored junior developers and established best practices for code reviews and testing."
        },
        {
            title: "Frontend Developer",
            company: "Innovate Solutions",
            period: "Jun 2018 - Dec 2020",
            description: "Developed and maintained components for a large-scale e-commerce platform using React and Redux. Collaborated with UX/UI designers to translate mockups into high-quality code."
        }
    ],
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "University of California, Berkeley",
            period: "Sep 2014 - May 2018"
        }
    ]
};

export default function ProfilePage() {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8">
            {/* Profile Header */}
            <Card>
                <CardContent className="p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <Avatar className="h-24 w-24 border-4 border-background">
                        <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                        <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                        <p className="text-muted-foreground">{userProfile.title}</p>
                        <div className="flex items-center justify-center md:justify-start space-x-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{userProfile.location}</span>
                            <span className="flex items-center"><Mail className="w-4 h-4 mr-1" />{userProfile.email}</span>
                            <span className="flex items-center"><Phone className="w-4 h-4 mr-1" />{userProfile.phone}</span>
                        </div>
                    </div>
                    <Button onClick={() => setIsEditOpen(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About Me */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About Me</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{userProfile.about}</p>
                        </CardContent>
                    </Card>

                    {/* Work Experience */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Briefcase className="w-5 h-5 mr-2" />Work Experience</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {userProfile.experience.map((exp, index) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{exp.title}</h3>
                                        <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                                        <p className="mt-2 text-sm">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {userProfile.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </CardContent>
                    </Card>

                    {/* Education */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><GraduationCap className="w-5 h-5 mr-2" />Education</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {userProfile.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <EditProfileForm
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                profile={userProfile}
            />

            
            {/* Candidate Feedbacks from HRs */}
            <CandidateFeedbackList feedbacks={mockCandidateFeedbacks.filter(fb => fb.candidateId === "c123")} />
            
        </div>
    );
}