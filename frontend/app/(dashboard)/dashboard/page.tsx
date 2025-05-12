import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ModuleCards } from "@/components/dashboard/module-cards"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your system's performance and recent activities." />
      <div className="grid gap-4 md:gap-8">
        <DashboardStats />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ModuleCards className="md:col-span-1 lg:col-span-4" />
          <RecentActivity className="md:col-span-1 lg:col-span-3" />
        </div>
      </div>
    </DashboardShell>
  )
}
