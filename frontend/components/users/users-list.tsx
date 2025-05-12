"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, Key, Lock, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { SortIndicator } from "@/components/ui/sort-indicator"

// Define the type for our user data
type User = {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: string
  lastLogin: string
}

// Define the type for our sort state
type SortField = keyof User | null
type SortDirection = "asc" | "desc" | null

export function UsersList() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "U001",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      department: "IT",
      status: "Active",
      lastLogin: "2023-04-15 09:30 AM",
    },
    {
      id: "U002",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Manager",
      department: "HR",
      status: "Active",
      lastLogin: "2023-04-14 02:15 PM",
    },
    {
      id: "U003",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
      department: "Finance",
      status: "Inactive",
      lastLogin: "2023-04-10 11:45 AM",
    },
    {
      id: "U004",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Manager",
      department: "Marketing",
      status: "Active",
      lastLogin: "2023-04-15 10:20 AM",
    },
    {
      id: "U005",
      name: "David Brown",
      email: "david@example.com",
      role: "User",
      department: "Operations",
      status: "Active",
      lastLogin: "2023-04-14 04:30 PM",
    },
  ])

  // Status options with their respective styles
  const statusOptions = [
    { value: "Active", label: "Active", variant: "default" },
    { value: "Inactive", label: "Inactive", variant: "secondary" },
  ]

  // Track which user's status is being edited
  const [editingStatus, setEditingStatus] = useState<string | null>(null)

  // Sorting state
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of user ${userId} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))

      toast({
        title: "Status updated",
        description: `User status has been changed to ${newStatus}.`,
      })

      // Close the status editor
      setEditingStatus(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
      if (sortDirection === "desc") {
        setSortField(null)
      }
    } else {
      // Set new sort field and direction
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Sort the users based on current sort field and direction
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField || !sortDirection) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              User
              {(sortField === "name" || !sortField) && (
                <SortIndicator direction={sortField === "name" ? sortDirection : null} />
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
              Role
              {sortField === "role" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
              Department
              {sortField === "department" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortField === "status" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("lastLogin")}>
              Last Login
              {sortField === "lastLogin" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>
                {editingStatus === user.id ? (
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleStatusChange(user.id, option.value)}
                        className={cn(
                          "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
                          option.variant === "default"
                            ? "bg-primary text-primary-foreground hover:bg-primary/80"
                            : option.variant === "destructive"
                              ? "bg-destructive text-destructive-foreground hover:bg-destructive/80"
                              : option.variant === "outline"
                                ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <Badge
                    onClick={() => setEditingStatus(user.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={user.status === "Active" ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/users/view/${user.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/users/edit/${user.id}`}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Key className="mr-2 h-4 w-4" /> Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Lock className="mr-2 h-4 w-4" />
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
