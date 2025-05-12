"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface SortableLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  field: string
  direction?: "asc" | "desc"
  className?: string
  children: React.ReactNode
}

export function SortableLink({ field, direction = "asc", className, children, ...props }: SortableLinkProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Clone the current search params
  const params = new URLSearchParams(searchParams.toString())

  // Set the sort parameters
  params.set("sort", field)
  params.set("dir", direction)

  // Create the URL with the sort parameters
  const href = `${pathname}?${params.toString()}`

  return (
    <Link href={href} className={cn("text-sm text-muted-foreground hover:text-foreground", className)} {...props}>
      {children}
    </Link>
  )
}
