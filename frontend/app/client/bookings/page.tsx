// app/(dashboard)/client/bookings/page.tsx
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
  Trash2,
  Store,
  CheckCircle2,
  RefreshCw
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

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ClientBookingsPage() {
  const { user, loading: authLoading } = useAuth()

  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchMyBookings = useCallback(async () => {
    if (!API_URL || !user?.id) return

    setIsRefreshing(true)

    try {
      const res = await fetch(`${API_URL}/api/clients/${user.id}/bookings`)

      if (!res.ok) throw new Error('Failed to fetch bookings')

      const data = await res.json()

      const result = Array.isArray(data)
        ? data
        : data.bookings || []

      setBookings(result)
    } catch (err) {
      console.error(err)
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

  const activeCount = bookings.filter(
    b =>
      b.status === 'PENDING' ||
      b.status === 'ACCEPTED' ||
      b.status === 'CONFIRMED'
  ).length

  const handleCancel = async (bookingId: string, vendorName?: string) => {
    if (!API_URL) return

    setIsDeleting(bookingId)

    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Delete failed')

      setBookings(prev => prev.filter(b => b.id !== bookingId))

      toast.success("Booking Cancelled", {
        description: `Your request for ${vendorName || 'vendor'} has been removed.`,
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
      })
    } catch (err) {
      console.error(err)
      toast.error("Server Error")
    } finally {
      setIsDeleting(null)
    }
  }

  if (authLoading || (loading && user)) {
    return (
      <DashboardShell userType="client" userName={user?.name || "Client"}>
        <div className="flex h-64 flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground italic">
            Syncing your events...
          </p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell userType="client" userName={user?.name || "Guest"}>
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold tracking-tight text-primary">
            My Schedule
          </h1>
          <p className="text-muted-foreground mt-2">
            You have <span className="font-bold text-accent">{activeCount}</span> active requests.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchMyBookings}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Sync Status
        </Button>
      </div>

      {/* CONTENT */}
      <div className="space-y-6">

        {!user ? (
          <div className="text-center p-16 bg-muted/20 rounded-3xl border-2 border-dashed">
            <p className="mb-6 font-medium text-lg">
              Sign in to track your bookings.
            </p>
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardContent className="p-0 flex flex-col md:flex-row">

                {/* VENDOR */}
                <div className="p-6 md:w-1/3 flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden">
                    <Image
                      src={booking.vendor?.avatar || '/placeholder-avatar.png'}
                      alt="vendor"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold flex items-center gap-2">
                      <Store className="w-4 h-4 text-primary" />
                      {booking.vendor?.name || 'Vendor'}
                    </h3>

                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {booking.vendor?.location || 'Remote'}
                    </p>
                  </div>
                </div>

                {/* SERVICE */}
                <div className="p-6 flex-1">
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {booking.service?.title || 'Service'}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {booking.eventDate
                      ? new Date(booking.eventDate).toLocaleDateString()
                      : 'No date'}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="p-6 md:w-1/3 flex justify-end gap-2 items-center">

                  <Button variant="ghost" size="icon">
                    <MessageCircle className="w-4 h-4" />
                  </Button>

                  <Badge>{booking.status}</Badge>

                  {/* ALERT DIALOG RESTORED */}
                  {booking.status === 'PENDING' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          {isDeleting === booking.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Cancel Booking?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove your booking with{' '}
                            <b>{booking.vendor?.name}</b>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Back</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleCancel(booking.id, booking.vendor?.name)
                            }
                          >
                            Yes, Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24">
            <Calendar className="h-10 w-10 mx-auto text-accent/30" />
            <h3 className="text-xl font-bold mt-4">
              No bookings yet
            </h3>

            <Button asChild className="mt-6">
              <Link href="/vendors">Find Vendors</Link>
            </Button>
          </div>
        )}

      </div>
    </DashboardShell>
  )
}