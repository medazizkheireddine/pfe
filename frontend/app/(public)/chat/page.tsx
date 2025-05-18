"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, ArrowLeft, Bot, User } from "lucide-react"
import { generateText } from "ai"                             // Core SDK
import { google } from "@ai-sdk/google"                      // Google provider :contentReference[oaicite:2]{index=2}
import { ModeToggle } from "@/components/mode-toggle"

// Define message type
type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Autoliv's AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const {resolvedTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch on theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    setMessages((prev) => [
      ...prev,
      {role: "user", content: input},
    ])
    setInput("")
    setIsLoading(true)

    try {
      // Build context
      const context = messages
          .map((m) =>
              `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
          )
          .join("\n")

      // Call Gemini via Google provider with your API key
      const {text} = await generateText({
        model: google(
            "gemini-2.0-flash",                         // or another Gemini ID
            {apiKey: "AIzaSyDnbRT20U3kRmXEXyrYnlnGzBwPqkrC_Cw"}  // your key
        ),
        prompt: `${context}\nUser: ${input}\nAssistant:`,
        system:
            "You are a helpful AI assistant for Autoliv, a global automotive safety supplier. Provide concise, helpful responses about automotive safety, manufacturing, and general information.",
      })

      // Append assistant reply
      setMessages((prev) => [...prev, {role: "assistant", content: text}])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const bgColor =
      mounted && resolvedTheme === "dark" ? "bg-background" : "bg-primary"
  const textColor =
      mounted && resolvedTheme === "dark"
          ? "text-foreground"
          : "text-primary-foreground"

  return (
      <div
          className={`flex flex-col min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}
      >
        {/* Header */}
        <header
            className={`sticky top-0 z-10 border-b border-foreground/10 ${bgColor}/80 backdrop-blur-sm`}
        >
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/login")}
                  className={`hover:bg-foreground/10`}
              >
                <ArrowLeft className="h-5 w-5"/>
                <span className="sr-only">Back to login</span>
              </Button>
              <div className="flex items-center gap-2">
                <img
                    src="/images/autoliv-logo.png"
                    alt="Autoliv Logo"
                    className="h-8 w-auto"
                />
                <h1 className="text-xl font-semibold">
                  Autoliv AI Assistant
                </h1>
              </div>
            </div>
            <ModeToggle/>
          </div>
        </header>

        {/* Chat messages */}
        <main className="flex-1 container py-4 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-4 mb-4">
            {messages.map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                      className={`flex-shrink-0 rounded-full p-2 ${
                          m.role === "assistant"
                              ? "bg-foreground text-background"
                              : "bg-foreground/20"
                      }`}
                  >
                    {m.role === "assistant" ? (
                        <Bot className="h-5 w-5"/>
                    ) : (
                        <User className="h-5 w-5"/>
                    )}
                  </div>
                  <div
                      className={`rounded-lg px-4 py-3 max-w-[85%] ${
                          m.role === "assistant"
                              ? "bg-foreground/10 border border-foreground/10"
                              : "bg-foreground/20 border border-foreground/10"
                      }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full p-2 bg-foreground text-background">
                    <Bot className="h-5 w-5"/>
                  </div>
                  <div className="rounded-lg px-4 py-3 bg-foreground/10 border border-foreground/10">
                    <Loader2 className="h-5 w-5 animate-spin text-foreground/70"/>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef}/>
          </div>
        </main>

        {/* Input */}
        <footer
            className={`sticky bottom-0 border-t border-foreground/10 ${bgColor}/80 backdrop-blur-sm py-4`}
        >
          <div className="container max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-foreground/10 border-foreground/20 placeholder:text-foreground/50"
                  disabled={isLoading}
              />
              <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-foreground text-background hover:bg-foreground/90"
              >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin"/>
                ) : (
                    <Send className="h-5 w-5"/>
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </form>
            <p className="text-xs text-foreground/50 mt-2 text-center">
              This is a demo AI assistant. Responses are generated by Gemini
              and may not always be accurate.
            </p>
          </div>
        </footer>
      </div>
  )
}
