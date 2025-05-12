import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autoliv IT Management",
  description: "IT Management system for Autoliv",
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-autoliv-blue dark:bg-autoliv-navy">{children}</div>
}
