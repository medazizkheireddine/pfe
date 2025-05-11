import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is logged in
  const user = request.cookies.get("user")?.value

  // Define auth paths
  const authPaths = ["/login", "/signup", "/forgot-password"]
  const isAuthPath = authPaths.some((path) => request.nextUrl.pathname === path)

  // Define dashboard paths (protected routes)
  const isDashboardPath = request.nextUrl.pathname.startsWith("/dashboard")

  // If accessing dashboard without being logged in, redirect to login
  if (isDashboardPath && !user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If accessing auth pages while logged in, redirect to dashboard
  if (isAuthPath && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}
