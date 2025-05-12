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
import { MoreHorizontal, Pencil, Trash2, FileText, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { SortIndicator } from "@/components/ui/sort-indicator"

// Define the type for our purchase data
type Purchase = {
  id: string
  vendor: string
  items: string
  amount: string
  status: string
  requestedBy: string
  orderDate: string
}

// Define the type for our sort state
type SortField = keyof Purchase | null
type SortDirection = "asc" | "desc" | null

export function PurchasesList() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: "PO001",
      vendor: "Office Supplies Co.",
      items: "Office Supplies Bundle",
      amount: "$1,250.00",
      status: "Delivered",
      requestedBy: "Sarah Williams",
      orderDate: "2023-03-15",
    },
    {
      id: "PO002",
      vendor: "Tech Solutions Inc.",
      items: "Laptops x5",
      amount: "$6,500.00",
      status: "Processing",
      requestedBy: "John Doe",
      orderDate: "2023-04-02",
    },
    {
      id: "PO003",
      vendor: "Furniture Depot",
      items: "Office Chairs x10",
      amount: "$2,800.00",
      status: "Shipped",
      requestedBy: "Mike Johnson",
      orderDate: "2023-03-28",
    },
    {
      id: "PO004",
      vendor: "PrinterTech",
      items: "Printer Supplies",
      amount: "$950.00",
      status: "Pending",
      requestedBy: "Jane Smith",
      orderDate: "2023-04-10",
    },
    {
      id: "PO005",
      vendor: "Safety Gear Ltd.",
      items: "Safety Equipment",
      amount: "$1,800.00",
      status: "Delivered",
      requestedBy: "David Brown",
      orderDate: "2023-03-20",
    },
  ])

  // Status options with their respective styles
  const statusOptions = [
    { value: "Pending", label: "Pending", variant: "destructive" },
    { value: "Processing", label: "Processing", variant: "secondary" },
    { value: "Shipped", label: "Shipped", variant: "outline" },
    { value: "Delivered", label: "Delivered", variant: "default" },
  ]

  // Track which purchase's status is being edited
  const [editingStatus, setEditingStatus] = useState<string | null>(null)

  // Sorting state
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleStatusChange = async (purchaseId: string, newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of purchase ${purchaseId} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) => (purchase.id === purchaseId ? { ...purchase, status: newStatus } : purchase)),
      )

      toast({
        title: "Status updated",
        description: `Purchase status has been changed to ${newStatus}.`,
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

  // Sort the purchases based on current sort field and direction
  const sortedPurchases = [...purchases].sort((a, b) => {
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
              Order ID
              {(sortField === "id" || !sortField) && (
                <SortIndicator direction={sortField === "id" ? sortDirection : null} />
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("vendor")}>
              Vendor
              {sortField === "vendor" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("items")}>
              Items
              {sortField === "items" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
              Amount
              {sortField === "amount" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortField === "status" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("requestedBy")}>
              Requested By
              {sortField === "requestedBy" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("orderDate")}>
              Order Date
              {sortField === "orderDate" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPurchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell className="font-medium">{purchase.id}</TableCell>
              <TableCell>{purchase.vendor}</TableCell>
              <TableCell>{purchase.items}</TableCell>
              <TableCell>{purchase.amount}</TableCell>
              <TableCell>
                {editingStatus === purchase.id ? (
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleStatusChange(purchase.id, option.value)}
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
                    onClick={() => setEditingStatus(purchase.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={
                      purchase.status === "Delivered"
                        ? "default"
                        : purchase.status === "Shipped"
                          ? "outline"
                          : purchase.status === "Processing"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {purchase.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{purchase.requestedBy}</TableCell>
              <TableCell>{purchase.orderDate}</TableCell>
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
                      <Link href={`/dashboard/purchases/view/${purchase.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/purchases/edit/${purchase.id}`}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" /> View Invoice
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
