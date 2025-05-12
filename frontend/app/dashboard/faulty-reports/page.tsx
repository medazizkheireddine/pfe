import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { FaultyReportsList } from "@/components/faulty-reports/faulty-reports-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function FaultyReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Faulty Reports" text="Track and manage faulty item reports.">
        <Button asChild>
          <Link href="/dashboard/faulty-reports/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Report
          </Link>
        </Button>
      </DashboardHeader>
      <FaultyReportsList />
    </DashboardShell>
  )
}
