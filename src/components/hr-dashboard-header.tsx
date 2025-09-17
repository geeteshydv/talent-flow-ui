import { Button } from "@/components/ui/button"
import { Bell, Search, Settings, User } from "lucide-react"

export function HRDashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HR</span>
              </div>
              <span className="font-semibold text-lg">TalentHub</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-primary font-medium">
                Dashboard
              </Button>
              <Button variant="ghost">Jobs</Button>
              <Button variant="ghost">Candidates</Button>
              <Button variant="ghost">Interviews</Button>
              <Button variant="ghost">Reports</Button>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 min-w-[300px]">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search candidates, jobs, or applications..."
                className="bg-transparent border-none outline-none flex-1 text-sm"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                3
              </span>
            </Button>

            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
