"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { MainNav } from "@/components/dashboard/main-nav"
import { Search } from "@/components/dashboard/search"
import { UserNav } from "@/components/dashboard/user-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ModeToggle } from "@/components/mode-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render theme-dependent elements after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden items-center space-x-2 md:flex">
              <img src="/images/autoliv-logo.png" alt="Autoliv Logo" className="h-8 w-auto" />
              <span className="hidden font-bold sm:inline-block">Autoliv IT Management</span>
            </Link>
            <MainNav className="mx-6" />
          </div>
          <div className="flex items-center gap-4">
            <Search />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DashboardSidebar />
        <main className="flex w-full flex-col overflow-hidden pt-6">{children}</main>
      </div>
    </div>
  )
}
