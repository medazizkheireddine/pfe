import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  const activities = [
    {
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg",
        initials: "JD",
      },
      action: "created a new asset",
      target: "Office Laptop",
      time: "2 minutes ago",
    },
    {
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg",
        initials: "JS",
      },
      action: "submitted a faulty report",
      target: "Printer #3",
      time: "1 hour ago",
    },
    {
      user: {
        name: "Mike Johnson",
        email: "mike@example.com",
        avatar: "/placeholder.svg",
        initials: "MJ",
      },
      action: "approved material request",
      target: "Paper supplies",
      time: "3 hours ago",
    },
    {
      user: {
        name: "Sarah Williams",
        email: "sarah@example.com",
        avatar: "/placeholder.svg",
        initials: "SW",
      },
      action: "created purchase order",
      target: "Office chairs",
      time: "5 hours ago",
    },
    {
      user: {
        name: "David Brown",
        email: "david@example.com",
        avatar: "/placeholder.svg",
        initials: "DB",
      },
      action: "updated stock levels",
      target: "Ink cartridges",
      time: "Yesterday",
    },
  ]

  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions performed in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
