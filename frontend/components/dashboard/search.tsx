"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function Search() {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-primary-foreground/70" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
      />
    </div>
  )
}
