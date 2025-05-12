"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { ModeToggle } from "@/components/mode-toggle"
import { AuthProvider } from "@/contexts/auth-context"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render theme-dependent elements after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // FIX: Use a different background color for auth pages based on theme
  const bgColor =
    mounted && resolvedTheme === "dark" ? "bg-background text-foreground" : "bg-primary text-primary-foreground"

  return (
    <AuthProvider>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${bgColor}`}>
        {/* Background pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoLTZ2LTZoNnptLTYtMTJ2Nmg2di02aC02em0tMTIgMTJ2Nmg2di02aC02em0wLTZoNnY2aC02di02em0xMiAwaDZ2Nmg2djZoLTZ2Nmg2djZoLTZ2Nmg2di02aDZ2LTZoLTZ2LTZoNnYtNmgtNnYtNmgtNnYtNmgtNnY2aC02djZoNnYtNnptLTEyIDEyaDZ2LTZoLTZ2NnptMC0xOHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-100"></div>

        {/* Top navigation bar with logo, theme toggle, and chat button */}
        <div className="w-full p-6 flex justify-between items-center relative z-20">
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <img src="/images/autoliv-logo.png" alt="Autoliv Logo" className="h-10 w-auto" />
            <h1 className="text-xl font-semibold">Autoliv IT Management</h1>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <ModeToggle />

            {/* Chat button */}
            <Link href="/chat">
              <Button
                variant="ghost"
                size="sm"
                className="bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 backdrop-blur-sm"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Try AI Assistant
              </Button>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center p-6 relative z-10">
          <div className="w-full max-w-md">{children}</div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-foreground/60 text-sm relative z-10">
          <p>© {new Date().getFullYear()} Autoliv Inc. All rights reserved.</p>
        </footer>
      </div>
    </AuthProvider>
  )
}
