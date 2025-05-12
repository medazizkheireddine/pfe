"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const assetFormSchema = z.object({
  name: z.string().min(2, {
    message: "Asset name must be at least 2 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  model: z.string().min(1, {
    message: "Model information is required.",
  }),
  serialNumber: z.string().min(1, {
    message: "Serial number is required.",
  }),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
  location: z.string().min(1, {
    message: "Location is required.",
  }),
  assignedTo: z.string().min(1, {
    message: "Please specify who this asset is assigned to.",
  }),
  purchaseDate: z.string().min(1, {
    message: "Purchase date is required.",
  }),
  warrantyExpiry: z.string().optional(),
})

type AssetFormValues = z.infer<typeof assetFormSchema>

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
  },
]

interface AssetFormProps {
  id?: string
}

export function AssetForm({ id }: AssetFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingAsset, setExistingAsset] = useState<any>(null)
  const isEditing = !!id

  const defaultValues: Partial<AssetFormValues> = {
    name: "",
    category: "",
    model: "",
    serialNumber: "",
    status: "Active",
    location: "",
    assignedTo: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    warrantyExpiry: "",
  }

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues,
  })

  // Fetch existing asset data when editing
  useEffect(() => {
    if (id) {
      // In a real application, you would fetch this data from your API
      // For demonstration, we're using the sample data
      const asset = sampleAssets.find((a) => a.id === id)

      if (asset) {
        setExistingAsset(asset)
        form.reset({
          name: asset.name,
          category: asset.category,
          model: asset.model,
          serialNumber: asset.serialNumber,
          status: asset.status,
          location: asset.location,
          assignedTo: asset.assignedTo,
          purchaseDate: asset.purchaseDate,
          warrantyExpiry: asset.warrantyExpiry,
        })
      }
    }
  }, [id, form])

  async function onSubmit(data: AssetFormValues) {
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log(data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: isEditing ? "Asset updated" : "Asset created",
        description: isEditing
          ? "The IT asset has been successfully updated."
          : "The IT asset has been successfully added to the system.",
      })

      router.push("/dashboard/assets")
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error ${isEditing ? "updating" : "creating"} the asset. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Status options with their respective styles
  const statusOptions = [
    { value: "Active", label: "Active", variant: "default" },
    { value: "Maintenance", label: "Maintenance", variant: "outline" },
    { value: "Faulty", label: "Faulty", variant: "destructive" },
    { value: "Retired", label: "Retired", variant: "secondary" },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dell XPS 15 Laptop" {...field} />
                    </FormControl>
                    <FormDescription>Enter the full name of the IT asset.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Laptop">Laptop</SelectItem>
                        <SelectItem value="Desktop">Desktop</SelectItem>
                        <SelectItem value="Server">Server</SelectItem>
                        <SelectItem value="Network Equipment">Network Equipment</SelectItem>
                        <SelectItem value="Printer">Printer</SelectItem>
                        <SelectItem value="Mobile Device">Mobile Device</SelectItem>
                        <SelectItem value="Peripheral">Peripheral</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the IT category for this asset.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="XPS 15 9500" {...field} />
                    </FormControl>
                    <FormDescription>Model number or specific version.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="SN12345678" {...field} />
                    </FormControl>
                    <FormDescription>Unique identifier for this asset.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={cn(
                              "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
                              field.value === option.value
                                ? option.variant === "default"
                                  ? "bg-primary text-primary-foreground hover:bg-primary/80 border-2 border-primary"
                                  : option.variant === "destructive"
                                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-2 border-destructive"
                                    : option.variant === "outline"
                                      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-2 border-primary"
                                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-primary"
                                : option.variant === "default"
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
                    </FormControl>
                    <FormDescription>Current status of the asset.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Office" {...field} />
                    </FormControl>
                    <FormDescription>Where is this asset located?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>Who is using this asset?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>When was this asset purchased?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="warrantyExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>When does the warranty expire? (Optional)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditing ? "Updating..." : "Saving...") : isEditing ? "Update Asset" : "Save Asset"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
