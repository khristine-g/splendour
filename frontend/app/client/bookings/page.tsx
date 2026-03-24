'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/context/auth-context'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  MapPin, 
  MessageCircle, 
  Loader2, 
  XCircle,
  Trash2,
  CheckCircle2,
  RefreshCw // Added this icon
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import Image from 'next/image'
import Link from 'next/link'

export default function ClientBookingsPage() {
  const { user, loading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // 1. Fetch Bookings Logic (Wrapped in useCallback to reuse for refresh)
  const fetchMyBookings = useCallback(async () => {
    if (!user?.id) return
    setIsRefreshing(true)
    try {
      const res = await fetch(`http://localhost:5000/api/clients/${user.id}/bookings`)
      const data = await res.json()
      const result = Array.isArray(data) ? data : (data.bookings || [])
      setBookings(result)
    } catch (err) {
      toast.error("Sync failed. Check your connection.")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (!authLoading && user?.id) {
      fetchMyBookings()
    } else if (!authLoading && !user) {
      setLoading(false)
    }
  }, [user, authLoading, fetchMyBookings])

  // 2. Logic to calculate active bookings count
  // We count both 'PENDING' and 'ACCEPTED' (or 'CONFIRMED')
  const activeCount = bookings.filter(b => 
    b.status === 'PENDING' || b.status === 'ACCEPTED' || b.status === 'CONFIRMED'
  ).length

  const handleCancel = async (bookingId: string, vendorName: string) => {
    setIsDeleting(bookingId)
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
        toast.success("Booking Cancelled", {
          description: `Your request for ${vendorName} has been removed.`,
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
        })
      }
    } catch (err) {
      toast.error("Server Error")
    } finally {
      setIsDeleting(null)
    }
  };

  if (authLoading || (loading && user)) {
    return (
      <DashboardShell userType="client" userName={user?.name || "Client"}>
        <div className="flex h-64 flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground italic">Syncing your events...</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell userType="client" userName={user?.name || "Guest"}>
      {/* HEADER SECTION WITH REFRESH BUTTON */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold tracking-tight text-primary">My Schedule</h1>
          <p className="text-muted-foreground mt-2">
            You have <span className="font-bold text-accent">{activeCount}</span> active professional service requests.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchMyBookings} 
          disabled={isRefreshing}
          className="rounded-full border-accent/20 hover:border-accent text-slate-600"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Syncing...' : 'Sync Status'}
        </Button>
      </div>

      <div className="space-y-6">
        {!user ? (
          <div className="text-center p-16 bg-muted/20 rounded-3xl border-2 border-dashed border-border/60">
            <p className="mb-6 font-medium text-lg">Sign in to track your event bookings.</p>
            <Button asChild size="lg" className="rounded-full px-8 bg-accent hover:bg-accent/90">
              <Link href="/auth/login">Login to Splendour</Link>
            </Button>
          </div>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id} className="group overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  
                  {/* Vendor Branding */}
                  <div className="p-6 flex items-center gap-4 md:w-1/3 bg-secondary/5 border-r border-border/40">
                    <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden border-2 border-background shadow-md bg-muted">
                      <Image 
                        src={booking.vendor?.avatar || '/placeholder-avatar.png'} 
                        alt="" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-base truncate group-hover:text-accent transition-colors">
                        {booking.vendor?.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 uppercase tracking-tighter">
                        <MapPin className="h-3 w-3 text-accent" /> {booking.vendor?.location || 'Remote'}
                      </p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6 flex-1 grid grid-cols-2 gap-6 items-center">
                    <div>
                      <span className="text-[10px] uppercase font-black text-muted-foreground/60 block mb-1 tracking-widest">Package</span>
                      <p className="text-sm font-semibold text-primary/90">{booking.service?.title || 'Professional Service'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black text-muted-foreground/60 block mb-1 tracking-widest">Scheduled For</span>
                      <p className="text-sm font-medium flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        {new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Status & Cancel Action */}
                  <div className="p-6 flex items-center justify-between md:justify-end gap-6 md:w-1/3 border-t md:border-t-0 md:border-l border-border/40">
                    <div className="text-right">
                      <Badge 
                        variant="outline" 
                        className={`font-bold px-3 py-1 rounded-full text-[10px] tracking-wider ${
                          (booking.status === 'CONFIRMED' || booking.status === 'ACCEPTED') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          booking.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                          'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-muted-foreground/20 hover:border-accent">
                        <MessageCircle className="h-4 w-4" />
                      </Button>

                      {booking.status === 'PENDING' && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all rounded-lg"
                              disabled={isDeleting === booking.id}
                            >
                              {isDeleting === booking.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-serif text-2xl text-primary">Confirm Cancellation</AlertDialogTitle>
                              <AlertDialogDescription className="text-base leading-relaxed">
                                Are you sure you want to retract your request for <span className="font-bold text-foreground">{booking.vendor?.name}</span>? 
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-3 mt-6">
                              <AlertDialogCancel className="rounded-full border-muted text-muted-foreground hover:bg-muted/10">Nevermind</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleCancel(booking.id, booking.vendor?.name)}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 font-bold"
                              >
                                Confirm Cancellation
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 bg-card rounded-[2rem] border-2 border-dashed border-border/40 shadow-inner">
             <div className="bg-accent/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
               <Calendar className="h-10 w-10 text-accent/30" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary">Your Calendar is Open</h3>
            <p className="text-muted-foreground text-sm mt-1 mb-8 max-w-xs mx-auto">
              Start planning your perfect event by exploring our curated professional vendors.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 px-10 rounded-full shadow-lg shadow-accent/20">
              <Link href="/vendors">Find Your Vendor</Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}