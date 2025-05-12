"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SortableLink } from "@/components/ui/sortable-link"

interface SortOptionsProps {
  title: string
  options: Array<{
    label: string
    field: string
    direction?: "asc" | "desc"
  }>
}

export function SortOptions({ title, options }: SortOptionsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Click on an option to sort the table</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <SortableLink
              key={`${option.field}-${option.direction || "asc"}`}
              field={option.field}
              direction={option.direction}
              className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              {option.label}
            </SortableLink>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
