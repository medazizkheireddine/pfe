import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-autoliv-blue dark:bg-autoliv-navy">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
        <p className="text-white text-lg">Loading AI Assistant...</p>
      </div>
    </div>
  )
}
