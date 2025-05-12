"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
  }[]
}

export function MainNav({ className, items, ...props }: MainNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/dashboard/assets",
      title: "Assets",
    },
    {
      href: "/dashboard/material-requests",
      title: "Material Requests",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary-foreground",
            pathname === item.href ? "text-primary-foreground" : "text-primary-foreground/70",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
