import { CandidateDashboardHeader } from "@/features/candidate/CandidateDashboardHeader";
import { DashboardStats } from "@/features/candidate/DashboardStats";
import { ProfileCompletionCard } from "@/features/candidate/ProfileCompletionCard";
import { RecommendedJobs } from "@/features/candidate/RecommendedJobs";
import { RecentActivityCard } from "@/features/candidate/RecentActivityCard";
import { QuickActionsCard } from "@/features/candidate/QuickActionsCard";

export const CandidatePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <CandidateDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">
            Welcome back, Sarah!
          </h1>
          <p className="text-muted-foreground text-lg">
            {"Here's what's happening with your job search today."}
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Actions */}
          <div className="space-y-6">
            <ProfileCompletionCard />
            <QuickActionsCard />
          </div>

          {/* Right Column - Jobs & Activity */}
          <div className="lg:col-span-2 space-y-6">
            <RecommendedJobs />
            <RecentActivityCard />
          </div>
        </div>
      </main>
    </div>
  );
};
