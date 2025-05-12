"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Mail, Phone, Building, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  id: "U001",
  name: "Admin User",
  email: "admin@autoliv.com",
  avatar: "/placeholder.svg",
  role: "Admin",
  department: "IT",
  phone: "+1 (555) 123-4567",
  location: "Main Office, Building A",
  joinDate: "January 15, 2022",
  bio: "IT Administrator with expertise in system management and network security. Responsible for maintaining the company's IT infrastructure and providing technical support to employees.",
  skills: ["System Administration", "Network Security", "Cloud Infrastructure", "Technical Support", "IT Management"],
  recentActivity: [
    {
      action: "Updated asset status",
      target: "Dell XPS 15 Laptop (A001)",
      time: "2 hours ago",
    },
    {
      action: "Approved material request",
      target: "Office Supplies (MR003)",
      time: "Yesterday",
    },
    {
      action: "Created new user account",
      target: "Sarah Williams (U004)",
      time: "3 days ago",
    },
  ],
}

export function UserProfile() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal and contact information</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/settings/profile">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="text-xl">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-2xl font-bold">{userData.name}</h3>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <Badge variant="default">{userData.role}</Badge>
                <Badge variant="outline">{userData.department}</Badge>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </div>
              <p className="font-medium">{userData.email}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                Phone
              </div>
              <p className="font-medium">{userData.phone}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Building className="mr-2 h-4 w-4" />
                Department
              </div>
              <p className="font-medium">{userData.department}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Joined
              </div>
              <p className="font-medium">{userData.joinDate}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                Location
              </div>
              <p className="font-medium">{userData.location}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 font-medium">Bio</h4>
            <p className="text-sm text-muted-foreground">{userData.bio}</p>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 font-medium">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.recentActivity.map((activity, index) => (
              <div key={index} className="flex flex-col space-y-1 border-b pb-3 last:border-0">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.target}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <p className="font-medium">Password</p>
            <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-muted-foreground">Not enabled</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="font-medium">Login Sessions</p>
            <p className="text-sm text-muted-foreground">1 active session</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/settings/security">
              <Pencil className="mr-2 h-4 w-4" />
              Manage Security
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
