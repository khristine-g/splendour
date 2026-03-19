'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  History,
  CreditCard,
  Bell,
  User,
  Package,
  BookOpen,
  DollarSign,
  Users,
  BarChart3,
  ShieldCheck,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
}

const clientNav: NavItem[] = [
  { label: 'Overview', href: '/client/dashboard', icon: LayoutDashboard },
  { label: 'Upcoming Bookings', href: '/client/bookings', icon: CalendarDays },
  { label: 'Booking History', href: '/client/history', icon: History },
  { label: 'Payments', href: '/client/payments', icon: CreditCard },
  { label: 'Notifications', href: '/client/notifications', icon: Bell },
  { label: 'Profile', href: '/client/profile', icon: User },
]

const vendorNav: NavItem[] = [
  { label: 'Overview', href: '/vendor/dashboard', icon: LayoutDashboard },
  { label: 'My Services', href: '/vendor/services', icon: Package },
  { label: 'Booking Requests', href: '/vendor/bookings', icon: BookOpen },
  { label: 'Calendar', href: '/vendor/calendar', icon: CalendarDays },
  { label: 'Earnings', href: '/vendor/earnings', icon: DollarSign },
  { label: 'Profile', href: '/vendor/profile', icon: User },
]

const adminNav: NavItem[] = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Vendors', href: '/admin/vendors', icon: ShieldCheck },
  { label: 'Bookings', href: '/admin/bookings', icon: BookOpen },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

interface DashboardSidebarProps {
  role: 'client' | 'vendor' | 'admin'
  userName: string
  userEmail: string
  userAvatar?: string
}

export function DashboardSidebar({ role, userName, userEmail }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = role === 'client' ? clientNav : role === 'vendor' ? vendorNav : adminNav
  const roleLabel = role === 'client' ? 'Client Portal' : role === 'vendor' ? 'Vendor Portal' : 'Admin Console'

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Brand */}
      <div className={cn('flex h-16 items-center border-b border-sidebar-border px-4', collapsed && 'justify-center')}>
        {!collapsed ? (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-primary">
              <Sparkles className="h-4 w-4 text-sidebar" />
            </div>
            <div>
              <p className="font-serif text-sm font-bold leading-none text-sidebar-foreground">Splendour</p>
              <p className="text-[10px] text-sidebar-foreground/50">{roleLabel}</p>
            </div>
          </Link>
        ) : (
          <Link href="/">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-primary">
              <Sparkles className="h-4 w-4 text-sidebar" />
            </div>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    collapsed && 'justify-center px-2',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className={cn('border-t border-sidebar-border p-3', collapsed && 'flex justify-center')}>
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{userName}</p>
              <p className="truncate text-xs text-sidebar-foreground/50">{userEmail}</p>
            </div>
            <button className="ml-2 rounded p-1 text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button className="rounded p-1 text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-center border-t border-sidebar-border py-2 text-sidebar-foreground/40 hover:text-sidebar-foreground"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  )
}
