"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render the toggle on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="bg-background/10 border-foreground/20">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  // FIX: Correctly identify the current theme
  const isDarkMode = resolvedTheme === "dark"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={isDarkMode ? "bg-background/10 border-foreground/20" : "bg-background/10 border-foreground/20"}
        >
          {/* Show Sun icon when in light mode, Moon icon when in dark mode */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all text-amber-500 ${isDarkMode ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all text-sky-300 ${isDarkMode ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className={!isDarkMode ? "bg-accent" : ""}>
          <Sun className="mr-2 h-4 w-4 text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={isDarkMode ? "bg-accent" : ""}>
          <Moon className="mr-2 h-4 w-4 text-sky-300" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <span className="mr-2">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
