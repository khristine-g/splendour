//app/admin/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Users, Store, CreditCard, 
  LogOut, ShieldCheck,Calendar, Globe, Home, ChevronRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAuth()

 const navItems = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar }, // Added this line
  { name: 'Vendors', href: '/admin/vendors', icon: Store },
  { name: 'Clients', href: '/admin/users', icon: Users },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
]

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col sticky top-0 h-screen shadow-sm">
        
        {/* --- VISIBLE HOME BUTTON --- */}
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
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Exit Admin</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            System Menu
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
                    ? 'bg-primary/5 text-primary shadow-sm border border-primary/10' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-400")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-50 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" onClick={logout}>
            <LogOut className="w-4 h-4 mr-3" /> 
            <span className="font-medium text-sm">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Admin Command Center
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">System Admin</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Live Online</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600">A</div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}