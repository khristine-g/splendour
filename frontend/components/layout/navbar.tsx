'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Sparkles, User, LogOut, LayoutDashboard, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  
  const { user, logout, loading } = useAuth() 


  const getDashboardHref = () => {
    if (!user) return '/auth/login'
    switch (user.role) {
      case 'VENDOR': return '/vendor/dashboard'
      case 'ADMIN': return '/admin/dashboard'
      default: return '/client/dashboard'
    }
  }

  const dashboardHref = getDashboardHref()

  const navLinks = [
    { label: 'Find Vendors', href: '/vendors' },
    { label: 'How It Works', href: '/#how-it-works' },
    ...(!user || user.role === 'CLIENT' ? [{ label: 'Become a Vendor', href: '/auth/register?role=vendor' }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary transition-transform group-hover:scale-110">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <span className="font-serif text-xl font-bold text-primary">Splendour</span>
        </Link>
       

       
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                pathname === link.href ? 'text-accent' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

     
        <div className="hidden items-center gap-3 md:flex">
      
          {user && <NotificationBell />}
          
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 gap-2 pl-2 pr-4 hover:bg-accent/90">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">Hey, {user.name.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={dashboardHref} className="cursor-pointer flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/settings" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => logout()} 
                  className="text-red-600 focus:text-red-600 cursor-pointer flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </>
          )}

          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/20 font-semibold" asChild>
            <Link href="/vendors">Book Now</Link>
          </Button>
        </div>

      
        <button className="rounded-md p-2 text-foreground md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

     
      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3">
            {user && (
               <div className="mb-2 px-2 py-1 border-b border-border pb-3">
                 <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Logged in as</p>
                 <p className="font-serif text-lg font-bold text-primary">{user.name}</p>
               </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              {user ? (
                <>
                  <Button variant="outline" size="sm" asChild onClick={() => setOpen(false)}>
                    <Link href={dashboardHref}>Dashboard</Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { logout(); setOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild onClick={() => setOpen(false)}>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild onClick={() => setOpen(false)}>
                    <Link href="/auth/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}