import { HRDashboardHeader } from "@/components/hr-dashboard-header"
import { HRDashboardStats } from "@/components/hr-dashboard-stats"
import { ActiveJobs } from "@/components/active-jobs"
import { RecentApplications } from "@/components/recent-applications"
import { InterviewSchedule } from "@/components/interview-schedule"
import { HRQuickActions } from "@/components/hr-quick-actions"

export default function HRDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <HRDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">Welcome back, Jennifer!</h1>
          <p className="text-muted-foreground text-lg">{"Here's your recruitment overview for today."}</p>
        </div>

        {/* Dashboard Stats */}
        <HRDashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Active Jobs */}
          <div className="space-y-6">
            <HRQuickActions />
            <ActiveJobs />
          </div>

          {/* Right Column - Applications & Interviews */}
          <div className="lg:col-span-2 space-y-6">
            <RecentApplications />
            <InterviewSchedule />
          </div>
        </div>
      </main>
    </div>
  )
}
