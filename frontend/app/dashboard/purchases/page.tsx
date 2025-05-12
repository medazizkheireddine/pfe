import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { PurchasesList } from "@/components/purchases/purchases-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function PurchasesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Purchases" text="Track purchase orders and procurement.">
        <Button asChild>
          <Link href="/dashboard/purchases/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Purchase
          </Link>
        </Button>
      </DashboardHeader>
      <PurchasesList />
    </DashboardShell>
  )
}
