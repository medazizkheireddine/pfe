"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    assetUpdates: true,
    materialRequests: true,
    faultyReports: true,
    securityAlerts: true,
    systemUpdates: false,
    weeklyDigest: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggle = (setting: keyof typeof settings) => (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [setting]: checked }))
  }

  const handleSaveChanges = async () => {
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log(settings)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure which email notifications you receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates and activities.
              </p>
            </div>
            <Switch checked={settings.emailNotifications} onCheckedChange={handleToggle("emailNotifications")} />
          </div>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Notification Categories</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm">Asset Updates</h5>
                <p className="text-xs text-muted-foreground">Notifications about asset status changes and updates.</p>
              </div>
              <Switch
                checked={settings.assetUpdates}
                onCheckedChange={handleToggle("assetUpdates")}
                disabled={!settings.emailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm">Material Requests</h5>
                <p className="text-xs text-muted-foreground">Notifications about new and updated material requests.</p>
              </div>
              <Switch
                checked={settings.materialRequests}
                onCheckedChange={handleToggle("materialRequests")}
                disabled={!settings.emailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm">Faulty Reports</h5>
                <p className="text-xs text-muted-foreground">
                  Notifications about new faulty reports and status changes.
                </p>
              </div>
              <Switch
                checked={settings.faultyReports}
                onCheckedChange={handleToggle("faultyReports")}
                disabled={!settings.emailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm">Security Alerts</h5>
                <p className="text-xs text-muted-foreground">Important security notifications and alerts.</p>
              </div>
              <Switch
                checked={settings.securityAlerts}
                onCheckedChange={handleToggle("securityAlerts")}
                disabled={!settings.emailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm">System Updates</h5>
                <p className="text-xs text-muted-foreground">Notifications about system maintenance and updates.</p>
              </div>
              <Switch
                checked={settings.systemUpdates}
                onCheckedChange={handleToggle("systemUpdates")}
                disabled={!settings.emailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm">Weekly Digest</h5>
                <p className="text-xs text-muted-foreground">Weekly summary of all activities and updates.</p>
              </div>
              <Switch
                checked={settings.weeklyDigest}
                onCheckedChange={handleToggle("weeklyDigest")}
                disabled={!settings.emailNotifications}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() =>
              setSettings({
                emailNotifications: true,
                assetUpdates: true,
                materialRequests: true,
                faultyReports: true,
                securityAlerts: true,
                systemUpdates: false,
                weeklyDigest: true,
              })
            }
          >
            Reset
          </Button>
          <Button onClick={handleSaveChanges} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
