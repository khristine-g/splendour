'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  User, 
  LogOut, 
  ShieldCheck, 
  Star, 
  DollarSign, 
  Briefcase 
} from 'lucide-react'
import { cn } from '@/lib/utils' // Assuming you have a standard shadcn utility for classes

interface ShellProps {
  children: React.ReactNode
  userType: 'client' | 'vendor' | 'admin'
  userName: string
}

export function DashboardShell({ children, userType, userName }: ShellProps) {
  const pathname = usePathname()

  const menuItems = {
    client: [
      { name: 'Overview', href: '/client/dashboard', icon: LayoutDashboard },
      { name: 'My Bookings', href: '/client/bookings', icon: Calendar },
      { name: 'Profile', href: '/client/profile', icon: User },
      { name: 'Settings', href: '/client/settings', icon: Settings },
    ],
    vendor: [
      { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
      { name: 'Manage Services', href: '/vendor/services', icon: Star },
      { name: 'Bookings', href: '/vendor/bookings', icon: Calendar },
      { name: 'Earnings', href: '/vendor/earnings', icon: DollarSign },
    ],
    admin: [
      { name: 'Stats', href: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'All Bookings', href: '/admin/bookings', icon: Calendar },
      { name: 'Vendors', href: '/admin/vendors', icon: ShieldCheck },
      { name: 'Clients', href: '/admin/clients', icon: User },
    ],
  }

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/">
            <h2 className="font-serif text-xl font-bold text-primary tracking-tight">Splendour</h2>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-1 opacity-70">
            {userType} Portal
          </p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5">
          {menuItems[userType].map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-primary")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-secondary/40">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate">{userName}</span>
              <span className="text-[10px] text-muted-foreground capitalize">{userType}</span>
            </div>
          </div>
          
          <button className="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
            <LogOut className="h-4 w-4" /> 
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="px-8 py-6 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Welcome back, <span className="text-primary font-serif italic">{userName}</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live System</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}