"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

export function SecuritySettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionNotificationsEnabled, setSessionNotificationsEnabled] = useState(true)

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: PasswordFormValues) {
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log(data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })

      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTwoFactorToggle = async (checked: boolean) => {
    // Here you would normally send the data to your API
    console.log("Two-factor authentication:", checked)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setTwoFactorEnabled(checked)

    toast({
      title: checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      description: checked ? "Your account is now more secure." : "Two-factor authentication has been disabled.",
    })
  }

  const handleSessionNotificationsToggle = async (checked: boolean) => {
    // Here you would normally send the data to your API
    console.log("Session notifications:", checked)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setSessionNotificationsEnabled(checked)

    toast({
      title: checked ? "Session notifications enabled" : "Session notifications disabled",
      description: checked
        ? "You will be notified of new login sessions."
        : "You will no longer be notified of new login sessions.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Enter your current password to verify your identity.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Re-enter your new password to confirm.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Require a verification code when signing in to your account.
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
          </div>
          {twoFactorEnabled && (
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm">
                Two-factor authentication is enabled. You will be required to enter a verification code when signing in.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <h4 className="font-medium">Current Session</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Windows 10 • Chrome</p>
                  <p className="text-xs text-muted-foreground">192.168.1.1 • Active now</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Current
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col space-y-1">
              <h4 className="font-medium">Other Sessions</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">macOS • Safari</p>
                  <p className="text-xs text-muted-foreground">172.16.254.1 • Last active: 2 days ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <h4 className="font-medium">Session Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive notifications when a new device signs into your account.
              </p>
            </div>
            <Switch checked={sessionNotificationsEnabled} onCheckedChange={handleSessionNotificationsToggle} />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Sign Out of All Sessions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
