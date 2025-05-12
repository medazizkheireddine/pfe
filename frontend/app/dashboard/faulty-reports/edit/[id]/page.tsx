import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { FaultyReportForm } from "@/components/faulty-reports/faulty-report-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface EditFaultyReportPageProps {
  params: {
    id: string
  }
}

export default function EditFaultyReportPage({ params }: EditFaultyReportPageProps) {
  const { id } = params

  return (
    <DashboardShell>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/faulty-reports">Faulty Reports</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Edit Report #{id}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DashboardHeader heading={`Edit Faulty Report #${id}`} text="Modify an existing faulty report." />
      <div className="grid gap-8">
        <FaultyReportForm id={id} />
      </div>
    </DashboardShell>
  )
}
