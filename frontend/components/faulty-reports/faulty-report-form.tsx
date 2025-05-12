"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const reportFormSchema = z.object({
  assetId: z.string().min(1, {
    message: "Asset ID is required.",
  }),
  assetName: z.string().min(1, {
    message: "Asset name is required.",
  }),
  reportedBy: z.string().min(1, {
    message: "Reporter name is required.",
  }),
  issue: z.string().min(5, {
    message: "Issue description must be at least 5 characters.",
  }),
  priority: z.string().min(1, {
    message: "Please select a priority level.",
  }),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
})

type ReportFormValues = z.infer<typeof reportFormSchema>

// Sample data for demonstration purposes
const sampleReports = [
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
]

interface FaultyReportFormProps {
  id?: string
}

export function FaultyReportForm({ id }: FaultyReportFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingReport, setExistingReport] = useState<any>(null)
  const isEditing = !!id

  const defaultValues: Partial<ReportFormValues> = {
    assetId: "",
    assetName: "",
    reportedBy: "",
    issue: "",
    priority: "Medium",
    status: "Pending",
  }

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues,
  })

  // Fetch existing report data when editing
  useEffect(() => {
    if (id) {
      // In a real application, you would fetch this data from your API
      // For demonstration, we're using the sample data
      const report = sampleReports.find((r) => r.id === id)

      if (report) {
        setExistingReport(report)
        form.reset({
          assetId: report.assetId,
          assetName: report.assetName,
          reportedBy: report.reportedBy,
          issue: report.issue,
          priority: report.priority,
          status: report.status,
        })
      }
    }
  }, [id, form])

  async function onSubmit(data: ReportFormValues) {
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log(data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: isEditing ? "Report updated" : "Report submitted",
        description: isEditing
          ? "The faulty report has been successfully updated."
          : "The faulty report has been successfully submitted.",
      })

      router.push("/dashboard/faulty-reports")
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error ${isEditing ? "updating" : "submitting"} the report. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="assetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset ID</FormLabel>
                    <FormControl>
                      <Input placeholder="A001" {...field} />
                    </FormControl>
                    <FormDescription>Enter the ID of the faulty asset.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dell XPS 15 Laptop" {...field} />
                    </FormControl>
                    <FormDescription>Enter the name of the faulty asset.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reportedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reported By</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>Who is reporting this issue?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormDescription>How urgent is this issue?</FormDescription>
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
                      <FormDescription>Current status of this report.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Issue Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the issue in detail..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormDescription>Provide a detailed description of the problem.</FormDescription>
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
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Submitting..."
                  : isEditing
                    ? "Update Report"
                    : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
