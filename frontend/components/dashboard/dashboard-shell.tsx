'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  Search, 
  Heart, 
  LogOut, 
  Star, 
  Home, 
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'

interface DashboardShellProps {
  children: React.ReactNode
  userName: string
  userType?: string 
}

export function DashboardShell({ children, userName, userType }: DashboardShellProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    { name: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', href: '/client/bookings', icon: Calendar },
    { name: 'Browse Vendors', href: '/vendors', icon: Search },
    { name: 'Saved', href: '/client/saved', icon: Heart },
  ]

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
     
      <aside className="w-64 bg-white border-r hidden md:flex flex-col sticky top-0 h-screen shadow-sm">
        
        
        <div className="p-6">
          <Link href="/">
            <div className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 transition-all shadow-lg group">
              <div className="flex items-center gap-3">
       
                <div className="bg-white/10 p-2 rounded-lg">
                  <Home className="w-4 h-4 text-amber-500" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-white leading-none">
                    Home
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Exit Panel</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

      
        <nav className="flex-1 px-4 space-y-1 mt-2">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            Main Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-slate-900" : "text-slate-400")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

       
        <div className="p-4 border-t border-slate-50">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" 
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-3" /> 
            <span className="font-medium text-sm">Sign Out</span>
          </Button>
        </div>
      </aside>

  
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {userType === 'admin' ? 'Admin Control' : 'Client Experience'}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">{userName}</p>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">
                {userType === 'admin' ? 'Verified Admin' : 'Premium Member'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600 uppercase">
              {userName ? userName.charAt(0) : 'U'}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}