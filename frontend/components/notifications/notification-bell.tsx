'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function NotificationBell() {
  const { user } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!user?.id) return

    const fetchNotificationCount = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notifications/${user.id}/count`)
        const data = await res.json()
        setCount(data.count || 0)
      } catch (err) {
        console.error("Bell fetch failed:", err)
      }
    }

    fetchNotificationCount()
    const interval = setInterval(fetchNotificationCount, 15000)
    return () => clearInterval(interval)
  }, [user?.id])

  return (
    <Link href="/notifications" className="relative group p-2 hover:bg-slate-100 rounded-full transition-all">
      <Bell 
        className={cn(
          "h-5 w-5 transition-colors",
          count > 0 ? "text-primary animate-pulse" : "text-slate-400 group-hover:text-slate-900"
        )} 
      />
      
     
      {count > 0 && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-slate-950 border-2 border-white shadow-sm animate-in zoom-in">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}