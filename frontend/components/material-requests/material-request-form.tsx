"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const requestFormSchema = z.object({
  requestedBy: z.string().min(1, {
    message: "Requester name is required.",
  }),
  department: z.string().min(1, {
    message: "Department is required.",
  }),
  items: z.string().min(5, {
    message: "Items description must be at least 5 characters.",
  }),
  priority: z.string().min(1, {
    message: "Please select a priority level.",
  }),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
  justification: z.string().min(10, {
    message: "Justification must be at least 10 characters.",
  }),
})

type RequestFormValues = z.infer<typeof requestFormSchema>

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
  },
]

interface MaterialRequestFormProps {
  id?: string
}

export function MaterialRequestForm({ id }: MaterialRequestFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingRequest, setExistingRequest] = useState<any>(null)
  const isEditing = !!id

  const defaultValues: Partial<RequestFormValues> = {
    requestedBy: "",
    department: "",
    items: "",
    priority: "Medium",
    status: "Pending",
    justification: "",
  }

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues,
  })

  // Fetch existing request data when editing
  useEffect(() => {
    if (id) {
      // In a real application, you would fetch this data from your API
      // For demonstration, we're using the sample data
      const request = sampleRequests.find((req) => req.id === id)

      if (request) {
        setExistingRequest(request)
        form.reset({
          requestedBy: request.requestedBy,
          department: request.department,
          items: request.items,
          priority: request.priority,
          status: request.status,
          justification: request.justification,
        })
      }
    }
  }, [id, form])

  async function onSubmit(data: RequestFormValues) {
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log(data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: isEditing ? "Request updated" : "Request submitted",
        description: isEditing
          ? "Your material request has been successfully updated."
          : "Your material request has been successfully submitted.",
      })

      router.push("/dashboard/material-requests")
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error ${isEditing ? "updating" : "submitting"} the request. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="requestedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requested By</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>Your full name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Your department.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
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
                      <FormDescription>Click to change the request status.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {priorityOptions.map((option) => (
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
                    <FormDescription>Click to set the request priority.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Items Requested</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List all items with quantities (e.g., Laptop Chargers x5)"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>List all items you need with quantities.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="justification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Justification</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Explain why these items are needed..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Provide a business justification for this request.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Submitting..."
                  : isEditing
                    ? "Update Request"
                    : "Submit Request"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
