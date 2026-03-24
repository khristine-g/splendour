//app/(dashboard)/notifications/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/context/auth-context'
import { Bell, CheckCheck, Trash2, Calendar, BellOff, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return
    try {
      const res = await fetch(`http://localhost:5000/api/notifications/${user.id}`)
      const data = await res.json()
      setNotifications(data)
    } catch (err) {
      toast.error("Failed to load notifications")
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  const markAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, { method: 'PATCH' })
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
    } catch (err) {
      console.error(err)
    }
  }

  const markAllRead = async () => {
    if (!user?.id) return
    try {
      await fetch(`http://localhost:5000/api/notifications/${user.id}/read-all`, { method: 'PATCH' })
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      toast.success("Inbox marked as read")
    } catch (err) {
      toast.error("Update failed")
    }
  }

  const clearAll = async () => {
    if (!user?.id || !confirm("Clear all alerts permanently?")) return
    try {
      await fetch(`http://localhost:5000/api/notifications/${user.id}`, { method: 'DELETE' })
      setNotifications([])
      toast.success("Inbox cleared")
    } catch (err) {
      toast.error("Delete failed")
    }
  }

  useEffect(() => { fetchNotifications() }, [fetchNotifications])

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 min-h-screen">
      <div className="flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold italic flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" /> Notifications
          </h1>
        </div>
        {notifications.length > 0 && (
          <div className="flex gap-4">
            <button onClick={markAllRead} className="text-xs font-bold text-primary flex items-center gap-1 uppercase tracking-tighter">
              <CheckCheck className="w-4 h-4" /> Read All
            </button>
            <button onClick={clearAll} className="text-xs font-bold text-red-500 flex items-center gap-1 uppercase tracking-tighter">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center font-serif italic text-slate-400">Loading alerts...</div>
        ) : notifications.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4 opacity-40">
            <BellOff className="w-12 h-12" />
            <p className="italic font-serif">Your inbox is clear</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => !n.isRead && markAsRead(n.id)}
              className={cn(
                "p-5 rounded-2xl border cursor-pointer transition-all",
                n.isRead ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-primary/20 shadow-sm shadow-primary/5 hover:border-primary/40"
              )}
            >
              <div className="flex justify-between items-start">
                <h3 className={cn("font-bold text-slate-900", !n.isRead && "text-primary")}>{n.title}</h3>
                {!n.isRead && <span className="h-2 w-2 rounded-full bg-primary" />}
              </div>
              <p className="text-slate-600 text-sm mt-1">{n.message}</p>
              <div className="mt-4 flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}