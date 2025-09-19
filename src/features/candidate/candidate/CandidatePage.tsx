import { CandidateDashboardHeader } from "./CandidateDashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { ProfileCompletionCard } from "./ProfileCompletionCard";
import { QuickActionsCard } from "./QuickActionsCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { RecommendedJobs } from "./RecommendedJobs";
import { ProfileCompletionProvider } from "./ProfileCompletionContext";
import { UserProfileProvider } from "./UserProfileContext";

export const CandidatePage = () => {
  return (
    <UserProfileProvider>
      <ProfileCompletionProvider>
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

            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <ProfileCompletionCard />
                <QuickActionsCard />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                <RecommendedJobs />
                <RecentActivityCard />
              </div>
            </div>
          </main>
        </div>
      </ProfileCompletionProvider>
    </UserProfileProvider>
  );
};