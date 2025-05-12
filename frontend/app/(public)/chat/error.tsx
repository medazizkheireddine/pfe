"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-autoliv-blue dark:bg-autoliv-navy p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20 p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-autoliv-error/20 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Something went wrong</h2>
          <p className="text-white/70">We encountered an error while loading the AI Assistant. Please try again.</p>
          <div className="flex gap-4 mt-4">
            <Button onClick={reset} className="bg-white text-autoliv-blue hover:bg-white/90">
              Try again
            </Button>
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Return to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
