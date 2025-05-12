import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UsersList } from "@/components/users/users-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage system users and permissions.">
        <Button asChild>
          <Link href="/dashboard/users/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </DashboardHeader>
      <UsersList />
    </DashboardShell>
  )
}
