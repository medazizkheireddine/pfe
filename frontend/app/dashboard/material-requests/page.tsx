import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MaterialRequestsList } from "@/components/material-requests/material-requests-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function MaterialRequestsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Material Requests" text="Manage material requisitions and orders.">
        <Button asChild>
          <Link href="/dashboard/material-requests/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </DashboardHeader>
      <MaterialRequestsList />
    </DashboardShell>
  )
}
