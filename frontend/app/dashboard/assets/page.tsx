import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AssetsList } from "@/components/assets/assets-list"
import { SortOptions } from "@/components/dashboard/sort-options"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AssetsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Assets" text="Manage your assets inventory.">
        <Button asChild>
          <Link href="/dashboard/assets/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Asset
          </Link>
        </Button>
      </DashboardHeader>

      <SortOptions
        title="Sort Assets"
        options={[
          { label: "ID (A-Z)", field: "id", direction: "asc" },
          { label: "ID (Z-A)", field: "id", direction: "desc" },
          { label: "Name (A-Z)", field: "name", direction: "asc" },
          { label: "Name (Z-A)", field: "name", direction: "desc" },
          { label: "Category", field: "category", direction: "asc" },
          { label: "Status", field: "status", direction: "asc" },
        ]}
      />

      <AssetsList />
    </DashboardShell>
  )
}
