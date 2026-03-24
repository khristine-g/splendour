// frontend/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('user-role')?.value 
  const { pathname } = request.nextUrl

  // 1. If no cookie exists, let the request pass.
  // Your page-level useEffect (the Auth Guard) will handle the redirect 
  // if localStorage is also empty. This prevents "Bouncing" on refresh.
  if (!userRole) {
    return NextResponse.next()
  }

  // 2. Strict Role Enforcement
  // Only redirect if the user is logged in as the WRONG role for that folder.
  if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname.startsWith('/vendor') && userRole !== 'VENDOR') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname.startsWith('/client') && userRole !== 'CLIENT') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

// 3. THE MATCHER IS CRITICAL
// This ensures the middleware ONLY runs on protected folders.
// It will NOT run on /, /vendors, /auth, etc.
export const config = {
  matcher: [
    '/admin/:path*', 
    '/vendor/:path*', 
    '/client/:path*'
  ],
}