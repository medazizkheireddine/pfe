import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, ClipboardList, ShoppingCart, Users } from "lucide-react"

interface ModuleCardsProps {
  className?: string
}

export function ModuleCards({ className }: ModuleCardsProps) {
  const modules = [
    {
      title: "Assets",
      description: "Manage your IT assets inventory",
      icon: Package,
      href: "/dashboard/assets",
      count: 142,
    },
    {
      title: "Faulty Reports",
      description: "Track and manage faulty items",
      icon: AlertTriangle,
      href: "/dashboard/faulty-reports",
      count: 7,
    },
    {
      title: "Material Requests",
      description: "Handle material requisitions",
      icon: ClipboardList,
      href: "/dashboard/material-requests",
      count: 12,
    },
    {
      title: "Purchases",
      description: "Track purchase orders",
      icon: ShoppingCart,
      href: "/dashboard/purchases",
      count: 23,
    },
    {
      title: "Users",
      description: "Manage system users",
      icon: Users,
      href: "/dashboard/users",
      count: 18,
    },
  ]

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {modules.map((module) => (
        <Link key={module.title} href={module.href}>
          <Card className="h-full transition-colors hover:bg-accent/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{module.title}</CardTitle>
              <div className="rounded-full bg-primary/10 p-1">
                <module.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{module.count}</div>
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
