
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Menu,
  X,
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
  Loader2,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { useAuth } from '@/context/auth-context'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const COLORS = {
  ivory: '#FFFCF6',
  cream: '#F8F3E9',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: '#E8DECE',
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const { user, logout, loading } = useAuth()

  const getDashboardHref = () => {
    if (!user) return '/auth/login'

    switch (user.role) {
      case 'VENDOR':
        return '/vendor/dashboard'
      case 'ADMIN':
        return '/admin/dashboard'
      default:
        return '/client/dashboard'
    }
  }

  const dashboardHref = getDashboardHref()

  const navLinks = [
    { label: 'Explore Vendors', href: '/vendors' },
    { label: 'How It Works', href: '/#how-it-works' },
    ...(!user || user.role === 'CLIENT'
      ? [
          {
            label: 'Become a Vendor',
            href: '/auth/register?role=vendor',
          },
        ]
      : []),
  ]

  const isActive = (href: string) => {
    if (href === '/#how-it-works') {
      return pathname === '/' && false
    }

    if (href === '/vendors') {
      return pathname === '/vendors' || pathname.startsWith('/vendors/')
    }

    return pathname === href
  }

  const closeMenu = () => setOpen(false)

  const handleLogout = async () => {
    closeMenu()
    await logout()
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-xl"
      style={{
        backgroundColor: 'rgba(255, 252, 246, 0.94)',
        borderColor: COLORS.border,
      }}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-14">

        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Splendour home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
            style={{ backgroundColor: COLORS.espresso }}
          >
            <Sparkles
              className="h-[18px] w-[18px]"
              style={{ color: COLORS.goldLight }}
              strokeWidth={1.7}
            />
          </span>

          <span className="flex flex-col">
            <span
              className="font-serif text-[25px] leading-none tracking-[-0.06em]"
              style={{ color: COLORS.espresso }}
            >
              Splendour
            </span>

            <span
              className="mt-1.5 hidden text-[8px] font-medium uppercase tracking-[0.25em] sm:block"
              style={{ color: COLORS.muted }}
            >
              Events, beautifully done
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex xl:gap-9"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[13px] font-medium transition-colors duration-200"
                style={{
                  color: active ? COLORS.espresso : COLORS.muted,
                }}
              >
                <span className="transition-colors group-hover:text-[#C7A36A]">
                  {link.label}
                </span>

                <span
                  className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: COLORS.gold,
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">

          {loading ? (
            <Loader2
              className="h-5 w-5 animate-spin"
              style={{ color: COLORS.muted }}
            />
          ) : user ? (
            <>
              <NotificationBell />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="group flex h-11 items-center gap-2.5 rounded-full border px-2.5 transition-all duration-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A36A]"
                    style={{
                      borderColor: COLORS.border,
                      backgroundColor: COLORS.ivory,
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full font-serif text-sm font-semibold"
                      style={{
                        backgroundColor: '#F0E4D0',
                        color: COLORS.espresso,
                      }}
                    >
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>

                    <span
                      className="max-w-[110px] truncate text-[13px] font-medium"
                      style={{ color: COLORS.espresso }}
                    >
                      {`Hey, ${user.name?.split(' ')[0] || 'there'}`}
                    </span>

                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      style={{ color: COLORS.muted }}
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-60 rounded-2xl border p-2 shadow-xl"
                  style={{
                    backgroundColor: COLORS.ivory,
                    borderColor: COLORS.border,
                    color: COLORS.espresso,
                  }}
                >
                  <DropdownMenuLabel className="px-3 py-2">
                    <p
                      className="font-serif text-base font-semibold"
                      style={{ color: COLORS.espresso }}
                    >
                      My Account
                    </p>
                    <p
                      className="mt-1 truncate text-xs font-normal"
                      style={{ color: COLORS.muted }}
                    >
                      {user.email}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator
                    style={{ backgroundColor: COLORS.border }}
                  />

                  <DropdownMenuItem asChild>
                    <Link
                      href={dashboardHref}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm focus:bg-[#F0E4D0]"
                    >
                      <LayoutDashboard
                        className="h-4 w-4"
                        style={{ color: COLORS.gold }}
                      />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile/settings"
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm focus:bg-[#F0E4D0]"
                    >
                      <User
                        className="h-4 w-4"
                        style={{ color: COLORS.gold }}
                      />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator
                    style={{ backgroundColor: COLORS.border }}
                  />

                  <DropdownMenuItem
                    onSelect={() => {
                      void handleLogout()
                    }}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-red-700 focus:bg-red-50 focus:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-3 py-2 text-[13px] font-medium transition-colors hover:text-[#C7A36A]"
                style={{ color: COLORS.muted }}
              >
                Sign In
              </Link>

              <Link
                href="/auth/register"
                className="rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-200 hover:border-[#C7A36A] hover:bg-[#F8F3E9]"
                style={{
                  borderColor: COLORS.border,
                  color: COLORS.espresso,
                }}
              >
                Get Started
              </Link>
            </>
          )}

          {/* Primary CTA */}
          <Link
            href="/vendors"
            className="group inline-flex h-11 items-center gap-2 rounded-full px-5 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              backgroundColor: COLORS.goldLight,
              color: COLORS.espresso,
              boxShadow: '0 4px 14px rgba(199, 163, 106, 0.12)',
            }}
          >
            Book Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {user && !loading && <NotificationBell />}

          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-[#F8F3E9]"
            style={{
              borderColor: COLORS.border,
              color: COLORS.espresso,
            }}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`grid md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        } transition-[grid-template-rows] duration-300 ease-in-out`}
      >
        <div className="overflow-hidden">
          <div
            className="border-t px-5 pb-6 pt-4 sm:px-8"
            style={{
              borderColor: COLORS.border,
              backgroundColor: COLORS.ivory,
            }}
          >
            {/* Signed-in user */}
            {user && (
              <div
                className="mb-4 flex items-center gap-3 rounded-2xl border p-3"
                style={{
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.cream,
                }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-lg font-semibold"
                  style={{
                    backgroundColor: '#F0E4D0',
                    color: COLORS.espresso,
                  }}
                >
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>

                <div className="min-w-0 flex-1">
                  <p
                    className="truncate font-serif text-base font-semibold"
                    style={{ color: COLORS.espresso }}
                  >
                    {user.name}
                  </p>
                  <p
                    className="truncate text-xs"
                    style={{ color: COLORS.muted }}
                  >
                    {user.email}
                  </p>
                </div>

                {loading && (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    style={{ color: COLORS.muted }}
                  />
                )}
              </div>
            )}

            {/* Links */}
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between border-b py-3.5 text-sm font-medium transition-colors hover:text-[#C7A36A]"
                    style={{
                      borderColor: COLORS.border,
                      color: active ? COLORS.espresso : COLORS.muted,
                    }}
                  >
                    {link.label}

                    <ArrowUpRight
                      className="h-4 w-4"
                      style={{
                        color: active ? COLORS.gold : '#B8AA99',
                      }}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Mobile account actions */}
            <div className="mt-5 flex flex-col gap-2.5">
              {loading ? (
                <div
                  className="flex items-center justify-center gap-2 py-3 text-sm"
                  style={{ color: COLORS.muted }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading your account...
                </div>
              ) : user ? (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors hover:bg-[#F8F3E9]"
                    style={{
                      borderColor: COLORS.border,
                      color: COLORS.espresso,
                    }}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Go to Dashboard
                  </Link>

                  <Link
                    href="/profile/settings"
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors hover:bg-[#F8F3E9]"
                    style={{
                      borderColor: COLORS.border,
                      color: COLORS.espresso,
                    }}
                  >
                    <User className="h-4 w-4" />
                    Profile Settings
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      void handleLogout()
                    }}
                    className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center rounded-full border text-sm font-medium transition-colors hover:bg-[#F8F3E9]"
                    style={{
                      borderColor: COLORS.border,
                      color: COLORS.espresso,
                    }}
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center rounded-full text-sm font-semibold transition-colors hover:bg-[#F2D7A7]"
                    style={{
                      backgroundColor: COLORS.goldLight,
                      color: COLORS.espresso,
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              )}

              <Link
                href="/vendors"
                onClick={closeMenu}
                className="mt-1 flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[#F2D7A7]"
                style={{
                  backgroundColor: COLORS.goldLight,
                  color: COLORS.espresso,
                }}
              >
                Find Your Vendors
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <p
                className="pt-2 text-center text-[10px] uppercase tracking-[0.22em]"
                style={{ color: '#B8AA99' }}
              >
                Events, beautifully done
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
