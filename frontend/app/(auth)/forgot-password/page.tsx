"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
      <div className="p-8">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>

        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">Reset password</h1>
          <p className="text-white/70">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 pl-3"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-white text-primary hover:bg-white/90 transition-colors font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send reset link
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="bg-green-500/20 text-green-100 p-4 rounded-md border border-green-500/30 text-center">
            <div className="flex justify-center mb-2">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-medium text-white mb-1">Check your email</h3>
            <p className="text-sm">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
          </div>
        )}
      </div>

      <div className="bg-black/20 p-6 text-center">
        <p className="text-sm text-white/70">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-white hover:underline transition-all">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
