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
import { MoreHorizontal, Pencil, Trash2, FileText, ShoppingCart, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { SortIndicator } from "@/components/ui/sort-indicator"

// Define the type for our vendor data
type Vendor = {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  category: string
  status: string
  lastOrder: string
}

// Define the type for our sort state
type SortField = keyof Vendor | null
type SortDirection = "asc" | "desc" | null

export function VendorsList() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "V001",
      name: "Office Supplies Co.",
      contactPerson: "Robert Johnson",
      email: "robert@officesupplies.com",
      phone: "+1-555-123-4567",
      category: "Office Supplies",
      status: "Active",
      lastOrder: "2023-04-02",
    },
    {
      id: "V002",
      name: "Tech Solutions Inc.",
      contactPerson: "Jennifer Lee",
      email: "jennifer@techsolutions.com",
      phone: "+1-555-987-6543",
      category: "Electronics",
      status: "Active",
      lastOrder: "2023-04-10",
    },
    {
      id: "V003",
      name: "Furniture Depot",
      contactPerson: "Michael Brown",
      email: "michael@furnituredepot.com",
      phone: "+1-555-456-7890",
      category: "Furniture",
      status: "Inactive",
      lastOrder: "2023-03-15",
    },
    {
      id: "V004",
      name: "PrinterTech",
      contactPerson: "Susan Miller",
      email: "susan@printertech.com",
      phone: "+1-555-789-0123",
      category: "Printer Supplies",
      status: "Active",
      lastOrder: "2023-04-05",
    },
    {
      id: "V005",
      name: "Safety Gear Ltd.",
      contactPerson: "James Wilson",
      email: "james@safetygear.com",
      phone: "+1-555-234-5678",
      category: "Safety Equipment",
      status: "Active",
      lastOrder: "2023-03-28",
    },
  ])

  // Status options with their respective styles
  const statusOptions = [
    { value: "Active", label: "Active", variant: "default" },
    { value: "Inactive", label: "Inactive", variant: "secondary" },
  ]

  // Track which vendor's status is being edited
  const [editingStatus, setEditingStatus] = useState<string | null>(null)

  // Sorting state
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleStatusChange = async (vendorId: string, newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of vendor ${vendorId} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setVendors((prevVendors) =>
        prevVendors.map((vendor) => (vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor)),
      )

      toast({
        title: "Status updated",
        description: `Vendor status has been changed to ${newStatus}.`,
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

  // Sort the vendors based on current sort field and direction
  const sortedVendors = [...vendors].sort((a, b) => {
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
              Vendor ID
              {(sortField === "id" || !sortField) && (
                <SortIndicator direction={sortField === "id" ? sortDirection : null} />
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Name
              {sortField === "name" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("contactPerson")}>
              Contact Person
              {sortField === "contactPerson" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
              Email
              {sortField === "email" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              Category
              {sortField === "category" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortField === "status" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("lastOrder")}>
              Last Order
              {sortField === "lastOrder" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.id}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.contactPerson}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.category}</TableCell>
              <TableCell>
                {editingStatus === vendor.id ? (
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleStatusChange(vendor.id, option.value)}
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
                    onClick={() => setEditingStatus(vendor.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={vendor.status === "Active" ? "default" : "secondary"}
                  >
                    {vendor.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{vendor.lastOrder}</TableCell>
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
                      <Link href={`/dashboard/vendors/view/${vendor.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/vendors/edit/${vendor.id}`}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShoppingCart className="mr-2 h-4 w-4" /> New Order
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
