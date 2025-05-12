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
const sampleAssets = [
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
    warrantyExpiry: "2026-01-15",
    notes: "Primary development machine for engineering team.",
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
    warrantyExpiry: "2025-11-03",
    notes: "Scheduled for maintenance every 3 months.",
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
    warrantyExpiry: "2025-08-22",
    notes: "Core network switch for east wing.",
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
    warrantyExpiry: "2025-02-10",
    notes: "Company phone with unlimited data plan.",
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
    warrantyExpiry: "2024-05-18",
    notes: "Lamp needs replacement, service scheduled.",
  },
]

interface AssetDetailsProps {
  id: string
}

export function AssetDetails({ id }: AssetDetailsProps) {
  const router = useRouter()
  const [asset, setAsset] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditingStatus, setIsEditingStatus] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For demonstration, we're using the sample data
    const foundAsset = sampleAssets.find((a) => a.id === id)

    if (foundAsset) {
      setAsset(foundAsset)
    }

    setLoading(false)
  }, [id])

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Here you would normally send the data to your API
      console.log(`Changing status of asset ${id} to ${newStatus}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setAsset((prev) => ({
        ...prev,
        status: newStatus,
      }))

      toast({
        title: "Status updated",
        description: `Asset status has been changed to ${newStatus}.`,
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

  // Status options with their respective styles
  const statusOptions = [
    { value: "Active", label: "Active", variant: "default" },
    { value: "Maintenance", label: "Maintenance", variant: "outline" },
    { value: "Faulty", label: "Faulty", variant: "destructive" },
    { value: "Retired", label: "Retired", variant: "secondary" },
  ]

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <p>Loading asset details...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!asset) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <p>Asset not found.</p>
            <Button asChild>
              <Link href="/dashboard/assets">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Assets
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
            <CardTitle>{asset.name}</CardTitle>
            <CardDescription>Asset ID: {asset.id}</CardDescription>
          </div>
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
                  asset.status === "Active"
                    ? "default"
                    : asset.status === "Maintenance"
                      ? "outline"
                      : asset.status === "Faulty"
                        ? "destructive"
                        : "secondary"
                }
              >
                {asset.status} (click to change)
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
            <p className="text-base">{asset.category}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Model</h3>
            <p className="text-base">{asset.model}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Serial Number</h3>
            <p className="text-base">{asset.serialNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
            <p className="text-base">{asset.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
            <p className="text-base">{asset.assignedTo}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Purchase Date</h3>
            <p className="text-base">{asset.purchaseDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Warranty Expiry</h3>
            <p className="text-base">{asset.warrantyExpiry || "N/A"}</p>
          </div>
        </div>

        {asset.notes && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
            <p className="text-base whitespace-pre-wrap">{asset.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard/assets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/assets/edit/${asset.id}`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Asset
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
