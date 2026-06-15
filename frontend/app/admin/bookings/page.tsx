// app/admin/bookings/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, RefreshCw, Calendar } from 'lucide-react'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    if (!API_URL) return

    try {
      const res = await fetch(`${API_URL}/api/admin/activity`)

      if (!res.ok) throw new Error('Failed to fetch bookings')

      const data = await res.json()
      setBookings(data.bookings || [])
    } catch (err) {
      toast.error("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const updateStatus = async (id: string, newStatus: string) => {
    if (!API_URL) return

    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!res.ok) throw new Error('Update failed')

      toast.success(`Booking ${newStatus.toLowerCase()} successfully`)
      fetchBookings()
    } catch (err) {
      toast.error("Failed to update status")
    }
  }

  if (loading)
    return (
      <div className="p-10 animate-pulse font-serif italic">
        Loading Bookings...
      </div>
    )

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold italic">
          Manage Bookings
        </h1>

        <Button onClick={fetchBookings} variant="ghost" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" /> Sync
        </Button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            className="border-none shadow-sm bg-white overflow-hidden"
          >
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    {booking.service?.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Client: <b>{booking.client?.name}</b> • Vendor:{' '}
                    <b>{booking.vendor?.name}</b>
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
                    Event Date:{' '}
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <StatusBadge status={booking.status} />

                {booking.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-2" />
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => updateStatus(booking.id, 'REJECTED')}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL // (not needed here, but safe pattern consistency)

  const styles: any = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    ACCEPTED: 'bg-green-100 text-green-700 border-green-200',
    REJECTED: 'bg-red-100 text-red-700 border-red-200',
    COMPLETED: 'bg-blue-100 text-blue-700 border-blue-200'
  }

  return (
    <Badge variant="outline" className={`${styles[status]} text-[10px] font-bold`}>
      {status === 'PENDING' && <Clock className="w-3 h-3 mr-1" />}
      {status}
    </Badge>
  )
}