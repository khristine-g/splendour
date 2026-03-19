import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Get user cookie (You should set this on login)
  const userRole = request.cookies.get('user-role')?.value 
  const { pathname } = request.nextUrl

  // 2. Define protected paths
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

// Only run middleware on dashboard routes
export const config = {
  matcher: ['/admin/:path*', '/vendor/:path*', '/client/:path*'],
}