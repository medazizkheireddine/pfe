import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, ClipboardList, ShoppingCart } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-autoliv-blue">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total IT Assets</CardTitle>
          <Package className="h-4 w-4 text-autoliv-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card className="border-autoliv-blue">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          <AlertTriangle className="h-4 w-4 text-autoliv-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">-3 from last week</p>
        </CardContent>
      </Card>
      <Card className="border-autoliv-blue">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Material Requests</CardTitle>
          <ClipboardList className="h-4 w-4 text-autoliv-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+4 from last week</p>
        </CardContent>
      </Card>
      <Card className="border-autoliv-blue">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Purchases</CardTitle>
          <ShoppingCart className="h-4 w-4 text-autoliv-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <p className="text-xs text-muted-foreground">+$12,234 this month</p>
        </CardContent>
      </Card>
    </div>
  )
}
