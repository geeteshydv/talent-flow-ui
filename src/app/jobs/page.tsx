"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HRDashboardHeader } from "@/components/hr-dashboard-header"
import { Plus, Search, Filter, Eye, Edit, Trash2, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      status: "Active",
      applications: 23,
      posted: "2024-01-15",
      salary: "$120k - $160k",
      description: "We're looking for an experienced frontend developer to join our team...",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      status: "Active",
      applications: 15,
      posted: "2024-01-10",
      salary: "$130k - $170k",
      description: "Lead product strategy and development for our core platform...",
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      status: "Active",
      applications: 31,
      posted: "2024-01-12",
      salary: "$90k - $120k",
      description: "Create beautiful and intuitive user experiences...",
    },
    {
      id: 4,
      title: "Data Analyst",
      department: "Analytics",
      location: "Chicago, IL",
      type: "Contract",
      status: "Draft",
      applications: 0,
      posted: "2024-01-18",
      salary: "$80k - $100k",
      description: "Analyze data to drive business insights and decisions...",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      status: "Paused",
      applications: 8,
      posted: "2024-01-05",
      salary: "$110k - $140k",
      description: "Manage infrastructure and deployment pipelines...",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Paused":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <HRDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Management</h1>
            <p className="text-muted-foreground">Create and manage job postings</p>
          </div>
          <Button className="gap-2"
          onClick={() => navigate('/hr/newjob')}>
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Department:</span> {job.department}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {job.location}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {job.type}
                      </div>
                      <div>
                        <span className="font-medium">Salary:</span> {job.salary}
                      </div>
                    </div>

                    <p className="text-muted-foreground">{job.description}</p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{job.applications} applications</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Posted:</span>{" "}
                        {new Date(job.posted).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No jobs found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
