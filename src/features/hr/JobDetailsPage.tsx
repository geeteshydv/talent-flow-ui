
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building, DollarSign, MapPin, Zap, Bookmark, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock data - in a real app, you'd fetch this based on the ID
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    match: 95,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    description: "TechCorp Inc. is looking for a seasoned Senior Frontend Developer to join our innovative team. You will be responsible for leading the development of our next-generation user interfaces, mentoring junior engineers, and driving technical excellence.",
    highlights: [
        "Lead the architecture and development of new features.",
        "Collaborate with cross-functional teams including product, design, and backend.",
        "Optimize applications for maximum speed and scalability.",
        "Contribute to a culture of high-quality code and continuous improvement."
    ],
    companyInfo: "TechCorp Inc. is a leading provider of cloud-based solutions, revolutionizing how businesses operate in the digital age. We value innovation, collaboration, and a passion for technology."
  },
  // Add other job details here...
];

export const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find(j => j.id.toString() === id);

  if (!job) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <Link to="/candidate">
            <Button variant="link" className="mt-4">Go back to dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
        <Link to="/candidate" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
        </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                    <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                        <span className="flex items-center"><Building className="w-4 h-4 mr-1.5"/>{job.company}</span>
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5"/>{job.location}</span>
                    </div>
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent text-base">
                  {job.match}% match
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                    {job.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-2">Job Description</h3>
                    <p className="text-muted-foreground">{job.description}</p>
                </div>
                 <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Job Highlights</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {job.highlights.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            <Card className="bg-primary/5">
                <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                        <Button size="lg" className="w-full">Apply Now</Button>
                        <Button size="lg" variant="outline" className="w-full">
                            <Bookmark className="w-4 h-4 mr-2"/>
                            Save Job
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Job Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center"><Briefcase className="w-4 h-4 mr-2"/>Job Type</span>
                        <span className="font-semibold">{job.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center"><DollarSign className="w-4 h-4 mr-2"/>Salary</span>
                        <span className="font-semibold">{job.salary}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center"><Zap className="w-4 h-4 mr-2"/>Posted</span>
                        <span className="font-semibold">{job.posted}</span>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">About {job.company}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{job.companyInfo}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};