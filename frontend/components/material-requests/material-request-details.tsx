"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Sample data for demonstration purposes
const sampleRequests = [
  {
    id: "MR001",
    requestedBy: "John Doe",
    department: "IT",
    items: "Laptop Chargers x5",
    status: "Pending",
    priority: "Medium",
    requestDate: "2023-04-15",
    justification: "Replacement needed for damaged chargers in the IT department.",
    comments: "Please expedite this request as we have several laptops that cannot be used.",
  },
  {
    id: "MR002",
    requestedBy: "Sarah Williams",
    department: "HR",
    items: "Office Supplies Bundle",
    status: "Approved",
    priority: "Low",
    requestDate: "2023-04-12",
    justification: "New employee onboarding kits needed for upcoming hires.",
    comments: "Approved by department head. Please deliver to HR office.",
  },
  {
    id: "MR003",
    requestedBy: "Mike Johnson",
    department: "Finance",
    items: "Printer Ink Cartridges x10",
    status: "Fulfilled",
    priority: "High",
    requestDate: "2023-04-08",
    justification: "Finance department printers are out of ink and needed for end-of-month reporting.",
    comments: "Delivered on April 10th.",
  },
  {
    id: "MR004",
    requestedBy: "Jane Smith",
    department: "Marketing",
    items: "Presentation Materials",
    status: "Rejected",
    priority: "Medium",
    requestDate: "2023-04-10",
    justification: "Required for upcoming client presentation next week.",
    comments: "Rejected due to budget constraints. Please resubmit with reduced quantities.",
  },
  {
    id: "MR005",
    requestedBy: "David Brown",
    department: "Operations",
    items: "Safety Equipment",
    status: "Pending",
    priority: "High",
    requestDate: "2023-04-14",
    justification: "Replacement safety equipment needed to comply with regulations.",
    comments: "Under review by safety officer.",
  },
]

interface MaterialRequestDetailsProps {
  id: string
}

export function MaterialRequestDetails({ id }: MaterialRequestDetailsProps) {
  const router = useRouter()
  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditingStatus, setIsEditingStatus] = useState(false)
  const [isEditingPriority, setIsEditingPriority] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For demonstration, we're using the sample data
    const foundRequest = sampleRequests.find((req) => req.id === id)

    if (foundRequest) {
      setRequest(foundRequest)
    }

    setLoading(false)
  }, [id])

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of request ${id} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setRequest((prev) => ({
        ...prev,
        status: newStatus,
      }))

      toast({
        title: "Status updated",
        description: `Request status has been changed to ${newStatus}.`,
      })

      setIsEditingStatus(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePriorityChange = async (newPriority: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing priority of request ${id} to ${newPriority}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setRequest((prev) => ({
        ...prev,
        priority: newPriority,
      }))

      toast({
        title: "Priority updated",
        description: `Request priority has been changed to ${newPriority}.`,
      })

      setIsEditingPriority(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the priority. Please try again.",
        variant: "destructive",
      })
    }
  }

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

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <p>Loading request details...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!request) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <p>Request not found.</p>
            <Button asChild>
              <Link href="/dashboard/material-requests">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Material Requests
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Material Request #{request.id}</CardTitle>
            <CardDescription>Submitted on {request.requestDate}</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
              {isEditingStatus ? (
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleStatusChange(option.value)}
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
                  onClick={() => setIsEditingStatus(true)}
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
                  {request.status} (click to change)
                </Badge>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Priority</div>
              {isEditingPriority ? (
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handlePriorityChange(option.value)}
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
                  onClick={() => setIsEditingPriority(true)}
                  className="cursor-pointer hover:opacity-80"
                  variant={
                    request.priority === "High"
                      ? "destructive"
                      : request.priority === "Medium"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {request.priority} Priority (click to change)
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Requested By</h3>
            <p className="text-base">{request.requestedBy}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
            <p className="text-base">{request.department}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Items Requested</h3>
          <p className="text-base whitespace-pre-wrap">{request.items}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Justification</h3>
          <p className="text-base whitespace-pre-wrap">{request.justification}</p>
        </div>

        {request.comments && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Comments</h3>
            <p className="text-base whitespace-pre-wrap">{request.comments}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard/material-requests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/material-requests/edit/${request.id}`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Full Request
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
