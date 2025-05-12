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
import { MoreHorizontal, Pencil, Trash2, CheckCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { SortIndicator } from "@/components/ui/sort-indicator"
import { useTableSort } from "@/hooks/use-table-sort"

// Define the type for our report data
type FaultyReport = {
  id: string
  assetId: string
  assetName: string
  reportedBy: string
  issue: string
  status: string
  priority: string
  reportDate: string
}

export function FaultyReportsList() {
  const [reports, setReports] = useState<FaultyReport[]>([
    {
      id: "FR001",
      assetId: "A005",
      assetName: "Projector",
      reportedBy: "Jane Smith",
      issue: "No display output",
      status: "Pending",
      priority: "High",
      reportDate: "2023-04-12",
    },
    {
      id: "FR002",
      assetId: "A002",
      assetName: "HP LaserJet Printer",
      reportedBy: "Mike Johnson",
      issue: "Paper jam issues",
      status: "In Progress",
      priority: "Medium",
      reportDate: "2023-04-10",
    },
    {
      id: "FR003",
      assetId: "A008",
      assetName: "Air Conditioner",
      reportedBy: "David Brown",
      issue: "Not cooling properly",
      status: "Resolved",
      priority: "High",
      reportDate: "2023-04-05",
    },
    {
      id: "FR004",
      assetId: "A012",
      assetName: "Coffee Machine",
      reportedBy: "Sarah Williams",
      issue: "Leaking water",
      status: "Pending",
      priority: "Low",
      reportDate: "2023-04-11",
    },
    {
      id: "FR005",
      assetId: "A015",
      assetName: "Scanner",
      reportedBy: "John Doe",
      issue: "Connection issues",
      status: "In Progress",
      priority: "Medium",
      reportDate: "2023-04-08",
    },
  ])

  // Status options with their respective styles
  const statusOptions = [
    { value: "Pending", label: "Pending", variant: "secondary" },
    { value: "In Progress", label: "In Progress", variant: "outline" },
    { value: "Resolved", label: "Resolved", variant: "default" },
  ]

  // Priority options with their respective styles
  const priorityOptions = [
    { value: "Low", label: "Low", variant: "secondary" },
    { value: "Medium", label: "Medium", variant: "outline" },
    { value: "High", label: "High", variant: "destructive" },
  ]

  // Track which report's status/priority is being edited
  const [editingStatus, setEditingStatus] = useState<string | null>(null)
  const [editingPriority, setEditingPriority] = useState<string | null>(null)

  // Use the table sort hook
  const { sortField, sortDirection, handleSort, sortData } = useTableSort<FaultyReport>()

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of report ${reportId} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setReports((prevReports) =>
        prevReports.map((report) => (report.id === reportId ? { ...report, status: newStatus } : report)),
      )

      toast({
        title: "Status updated",
        description: `Report status has been changed to ${newStatus}.`,
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

  const handlePriorityChange = async (reportId: string, newPriority: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing priority of report ${reportId} to ${newPriority}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setReports((prevReports) =>
        prevReports.map((report) => (report.id === reportId ? { ...report, priority: newPriority } : report)),
      )

      toast({
        title: "Priority updated",
        description: `Report priority has been changed to ${newPriority}.`,
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

  // Sort the reports using our hook
  const sortedReports = sortData(reports)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              Report ID
              {(sortField === "id" || !sortField) && (
                <SortIndicator direction={sortField === "id" ? sortDirection : null} />
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("assetName")}>
              Asset
              {sortField === "assetName" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("reportedBy")}>
              Reported By
              {sortField === "reportedBy" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("issue")}>
              Issue
              {sortField === "issue" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortField === "status" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("priority")}>
              Priority
              {sortField === "priority" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("reportDate")}>
              Report Date
              {sortField === "reportDate" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.id}</TableCell>
              <TableCell>
                {report.assetId} - {report.assetName}
              </TableCell>
              <TableCell>{report.reportedBy}</TableCell>
              <TableCell>{report.issue}</TableCell>
              <TableCell>
                {editingStatus === report.id ? (
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleStatusChange(report.id, option.value)}
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
                    onClick={() => setEditingStatus(report.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={
                      report.status === "Resolved"
                        ? "default"
                        : report.status === "In Progress"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {report.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {editingPriority === report.id ? (
                  <div className="flex flex-wrap gap-2">
                    {priorityOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handlePriorityChange(report.id, option.value)}
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
                    onClick={() => setEditingPriority(report.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={
                      report.priority === "High"
                        ? "destructive"
                        : report.priority === "Medium"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {report.priority}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{report.reportDate}</TableCell>
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
                      <Link href={`/dashboard/faulty-reports/view/${report.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/faulty-reports/edit/${report.id}`}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="mr-2 h-4 w-4" /> Mark as Resolved
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
