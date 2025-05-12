"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

interface User {
  id: string
  name: string
  email: string
  image?: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const userCookie = Cookies.get("user")
      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie)
          setUser(userData)
        } catch (error) {
          console.error("Failed to parse user cookie:", error)
          Cookies.remove("user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock login - in a real app, this would validate credentials with your API
      if (email === "admin@example.com" && password === "password") {
        // Mock user data
        const userData: User = {
          id: "1",
          name: "Admin User",
          email,
          role: "admin",
        }

        // Save user data to cookie
        Cookies.set("user", JSON.stringify(userData), { expires: 7 })
        setUser(userData)
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from your API
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
      }

      // Save user data to cookie
      Cookies.set("user", JSON.stringify(userData), { expires: 7 })
      setUser(userData)
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove("user")
    setUser(null)
    router.push("/login")
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In a real app, this would send a password reset email
    } catch (error) {
      console.error("Password reset failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
