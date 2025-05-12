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
import { MoreHorizontal, Pencil, Trash2, CheckCircle, XCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { SortIndicator } from "@/components/ui/sort-indicator"

// Define the type for our request data
type MaterialRequest = {
  id: string
  requestedBy: string
  department: string
  items: string
  status: string
  priority: string
  requestDate: string
}

// Define the type for our sort state
type SortField = keyof MaterialRequest | null
type SortDirection = "asc" | "desc" | null

export function MaterialRequestsList() {
  const [requests, setRequests] = useState<MaterialRequest[]>([
    {
      id: "MR001",
      requestedBy: "John Doe",
      department: "IT",
      items: "Laptop Chargers x5",
      status: "Pending",
      priority: "Medium",
      requestDate: "2023-04-15",
    },
    {
      id: "MR002",
      requestedBy: "Sarah Williams",
      department: "HR",
      items: "Office Supplies Bundle",
      status: "Approved",
      priority: "Low",
      requestDate: "2023-04-12",
    },
    {
      id: "MR003",
      requestedBy: "Mike Johnson",
      department: "Finance",
      items: "Printer Ink Cartridges x10",
      status: "Fulfilled",
      priority: "High",
      requestDate: "2023-04-08",
    },
    {
      id: "MR004",
      requestedBy: "Jane Smith",
      department: "Marketing",
      items: "Presentation Materials",
      status: "Rejected",
      priority: "Medium",
      requestDate: "2023-04-10",
    },
    {
      id: "MR005",
      requestedBy: "David Brown",
      department: "Operations",
      items: "Safety Equipment",
      status: "Pending",
      priority: "High",
      requestDate: "2023-04-14",
    },
  ])

  // Status options with their respective styles
  const statusOptions = [
    { value: "Pending", label: "Pending", variant: "secondary" },
    { value: "Approved", label: "Approved", variant: "outline" },
    { value: "Fulfilled", label: "Fulfilled", variant: "default" },
    { value: "Rejected", label: "Rejected", variant: "destructive" },
  ]

  // Priority options with their respective styles
  const priorityOptions = [
    { value: "Low", label: "Low", variant: "secondary" },
    { value: "Medium", label: "Medium", variant: "outline" },
    { value: "High", label: "High", variant: "destructive" },
  ]

  // Track which request's status/priority is being edited
  const [editingStatus, setEditingStatus] = useState<string | null>(null)
  const [editingPriority, setEditingPriority] = useState<string | null>(null)

  // Sorting state
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of request ${requestId} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setRequests((prevRequests) =>
        prevRequests.map((request) => (request.id === requestId ? { ...request, status: newStatus } : request)),
      )

      toast({
        title: "Status updated",
        description: `Request status has been changed to ${newStatus}.`,
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

  const handlePriorityChange = async (requestId: string, newPriority: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing priority of request ${requestId} to ${newPriority}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setRequests((prevRequests) =>
        prevRequests.map((request) => (request.id === requestId ? { ...request, priority: newPriority } : request)),
      )

      toast({
        title: "Priority updated",
        description: `Request priority has been changed to ${newPriority}.`,
      })

      // Close the priority editor
      setEditingPriority(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the priority. Please try again.",
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

  // Sort the requests based on current sort field and direction
  const sortedRequests = [...requests].sort((a, b) => {
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              Request ID
              {(sortField === "id" || !sortField) && (
                <SortIndicator direction={sortField === "id" ? sortDirection : null} />
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("requestedBy")}>
              Requested By
              {sortField === "requestedBy" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
              Department
              {sortField === "department" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("items")}>
              Items
              {sortField === "items" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortField === "status" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("priority")}>
              Priority
              {sortField === "priority" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("requestDate")}>
              Request Date
              {sortField === "requestDate" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.requestedBy}</TableCell>
              <TableCell>{request.department}</TableCell>
              <TableCell>{request.items}</TableCell>
              <TableCell>
                {editingStatus === request.id ? (
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleStatusChange(request.id, option.value)}
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
                    onClick={() => setEditingStatus(request.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={
                      request.status === "Fulfilled"
                        ? "default"
                        : request.status === "Approved"
                          ? "outline"
                          : request.status === "Rejected"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {editingPriority === request.id ? (
                  <div className="flex flex-wrap gap-2">
                    {priorityOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handlePriorityChange(request.id, option.value)}
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
                    onClick={() => setEditingPriority(request.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={
                      request.priority === "High"
                        ? "destructive"
                        : request.priority === "Medium"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {request.priority}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{request.requestDate}</TableCell>
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
                      <Link href={`/dashboard/material-requests/view/${request.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/material-requests/edit/${request.id}`}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="mr-2 h-4 w-4" /> Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <XCircle className="mr-2 h-4 w-4" /> Reject
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
