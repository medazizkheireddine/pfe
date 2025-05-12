import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

type SortDirection = "asc" | "desc" | null

interface SortIndicatorProps {
  direction: SortDirection
}

export function SortIndicator({ direction }: SortIndicatorProps) {
  if (direction === "asc") {
    return <ArrowUp className="ml-2 h-4 w-4" />
  }
  if (direction === "desc") {
    return <ArrowDown className="ml-2 h-4 w-4" />
  }
  return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
}
