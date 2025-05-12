import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { VendorsList } from "@/components/vendors/vendors-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function VendorsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Vendors" text="Manage supplier information and relationships.">
        <Button asChild>
          <Link href="/dashboard/vendors/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vendor
          </Link>
        </Button>
      </DashboardHeader>
      <VendorsList />
    </DashboardShell>
  )
}
