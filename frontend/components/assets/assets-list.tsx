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
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { SortIndicator } from "@/components/ui/sort-indicator"
import { useTableSort } from "@/hooks/use-table-sort"

// Define the type for our asset data
type Asset = {
  id: string
  name: string
  category: string
  model: string
  serialNumber: string
  status: string
  location: string
  assignedTo: string
  purchaseDate: string
}

export function AssetsList() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "A001",
      name: "Dell XPS 15 Laptop",
      category: "Laptop",
      model: "XPS 15 9500",
      serialNumber: "SN12345678",
      status: "Active",
      location: "Main Office",
      assignedTo: "John Doe",
      purchaseDate: "2023-01-15",
    },
    {
      id: "A002",
      name: "HP LaserJet Printer",
      category: "Printer",
      model: "LaserJet Pro M404dn",
      serialNumber: "SN87654321",
      status: "Maintenance",
      location: "Finance Dept",
      assignedTo: "Finance Team",
      purchaseDate: "2022-11-03",
    },
    {
      id: "A003",
      name: "Cisco Switch",
      category: "Network Equipment",
      model: "Catalyst 2960-X",
      serialNumber: "SN45678901",
      status: "Active",
      location: "Server Room",
      assignedTo: "IT Infrastructure",
      purchaseDate: "2022-08-22",
    },
    {
      id: "A004",
      name: "iPhone 13 Pro",
      category: "Mobile Device",
      model: "A2483",
      serialNumber: "SN98765432",
      status: "Active",
      location: "IT Dept",
      assignedTo: "Mike Johnson",
      purchaseDate: "2023-02-10",
    },
    {
      id: "A005",
      name: "Projector",
      category: "Peripheral",
      model: "Epson EB-U05",
      serialNumber: "SN56789012",
      status: "Faulty",
      location: "Conference Room",
      assignedTo: "Meeting Room",
      purchaseDate: "2022-05-18",
    },
  ])

  // Status options with their respective styles
  const statusOptions = [
    { value: "Active", label: "Active", variant: "default" },
    { value: "Maintenance", label: "Maintenance", variant: "outline" },
    { value: "Faulty", label: "Faulty", variant: "destructive" },
    { value: "Retired", label: "Retired", variant: "secondary" },
  ]

  // Track which asset's status is being edited
  const [editingStatus, setEditingStatus] = useState<string | null>(null)

  // Use the table sort hook
  const { sortField, sortDirection, handleSort, sortData } = useTableSort<Asset>()

  const handleStatusChange = async (assetId: string, newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of asset ${assetId} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setAssets((prevAssets) =>
        prevAssets.map((asset) => (asset.id === assetId ? { ...asset, status: newStatus } : asset)),
      )

      toast({
        title: "Status updated",
        description: `Asset status has been changed to ${newStatus}.`,
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

  // Sort the assets using our hook
  const sortedAssets = sortData(assets)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              Asset ID
              {(sortField === "id" || !sortField) && (
                <SortIndicator direction={sortField === "id" ? sortDirection : null} />
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Name
              {sortField === "name" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              Category
              {sortField === "category" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("model")}>
              Model
              {sortField === "model" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("serialNumber")}>
              Serial Number
              {sortField === "serialNumber" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortField === "status" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
              Location
              {sortField === "location" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("assignedTo")}>
              Assigned To
              {sortField === "assignedTo" && <SortIndicator direction={sortDirection} />}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.model}</TableCell>
              <TableCell>{asset.serialNumber}</TableCell>
              <TableCell>
                {editingStatus === asset.id ? (
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleStatusChange(asset.id, option.value)}
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
                    onClick={() => setEditingStatus(asset.id)}
                    className="cursor-pointer hover:opacity-80"
                    variant={
                      asset.status === "Active"
                        ? "default"
                        : asset.status === "Maintenance"
                          ? "outline"
                          : asset.status === "Faulty"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {asset.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>{asset.assignedTo}</TableCell>
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
                      <Link href={`/dashboard/assets/view/${asset.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/assets/edit/${asset.id}`}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Link>
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
