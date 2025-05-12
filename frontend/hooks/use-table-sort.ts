"use client"

import { useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

type SortDirection = "asc" | "desc" | null

export function useTableSort<T>(initialField: keyof T | null = null) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Get sort parameters from URL or use defaults
  const initialSortField = (searchParams.get("sort") as keyof T | null) || initialField
  const initialSortDirection = (searchParams.get("dir") as SortDirection) || null

  const [sortField, setSortField] = useState<keyof T | null>(initialSortField)
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection)

  // Update URL when sort changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (sortField) {
      params.set("sort", String(sortField))
    } else {
      params.delete("sort")
    }

    if (sortDirection) {
      params.set("dir", sortDirection)
    } else {
      params.delete("dir")
    }

    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [sortField, sortDirection, pathname, router, searchParams])

  // Handle sorting
  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
      if (sortDirection === "desc") {
        setSortField(null)
      }
    } else {
      // Set new sort field and direction
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Sort function
  const sortData = <D extends Record<keyof T, string>>(data: D[]): D[] => {
    if (!sortField || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }

  return {
    sortField,
    sortDirection,
    handleSort,
    sortData,
  }
}
