'use client'

import { useState, useEffect, useCallback } from 'react'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Mail, Check, X, Loader2, Clock } from 'lucide-react'

export default function VendorBookingsPage() {
  const vendorId = "cm0raw..." // Replace with auth logic later
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/vendors/${vendorId}/bookings`)
      const data = await res.json()
      setBookings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [vendorId])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleStatusUpdate = async (id: string, newStatus: 'CONFIRMED' | 'DECLINED') => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) fetchBookings() // Refresh the list
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardShell userType="vendor" userName="Vendor Admin">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Bookings Management</h1>
          <p className="text-muted-foreground mt-1">Review and manage your upcoming event requests.</p>
        </div>
        <Badge variant="outline" className="px-4 py-1 text-sm">
          {bookings.length} Total Requests
        </Badge>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-4">
                {/* Client Info */}
                <div className="p-6 bg-secondary/10 border-b md:border-b-0 md:border-r">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm truncate">{booking.client?.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {booking.client?.email}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    className={
                      booking.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200' :
                      booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-600 border-green-200' :
                      'bg-red-500/10 text-red-600 border-red-200'
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>

                {/* Event Details */}
                <div className="p-6 md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Service Requested</p>
                      <p className="text-sm font-semibold text-primary">{booking.service?.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Event Date</p>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(booking.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' })}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t flex items-center justify-between">
                    <span className="text-xs text-muted-foreground italic flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Requested on {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-lg font-black text-foreground">
                      ${booking.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 flex items-center justify-center md:justify-end gap-3 bg-secondary/5">
                  {booking.status === 'PENDING' ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 border-red-100 hover:bg-red-50"
                        onClick={() => handleStatusUpdate(booking.id, 'DECLINED')}
                      >
                        <X className="h-4 w-4 mr-2" /> Decline
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                      >
                        <Check className="h-4 w-4 mr-2" /> Accept Request
                      </Button>
                    </>
                  ) : (
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                      Decision Made
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-bold">No bookings found</h3>
          <p className="text-muted-foreground">When clients book your services, they will appear here.</p>
        </div>
      )}
    </DashboardShell>
  )
}