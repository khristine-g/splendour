'use client'

import { useState, useEffect } from 'react'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, MessageCircle, MoreVertical, Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function ClientBookingsPage() {
  const clientId = "khristine_id..." // Replace with actual auth ID
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/clients/${clientId}/bookings`)
        const data = await res.json()
        setBookings(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMyBookings()
  }, [])

  if (loading) {
    return (
      <DashboardShell userType="client" userName="Khristine">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell userType="client" userName="Khristine">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">My Event Bookings</h1>
        <p className="text-muted-foreground mt-1">Track your vendor requests and event schedule.</p>
      </div>

      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Vendor Avatar & Basic Info */}
                  <div className="p-6 flex items-center gap-4 md:w-1/3 bg-secondary/10">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-background">
                      <Image 
                        src={booking.vendor?.avatar || '/placeholder.png'} 
                        alt="" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{booking.vendor?.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {booking.vendor?.location}
                      </p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6 flex-1 grid grid-cols-2 gap-4 items-center">
                    <div>
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Service</p>
                      <p className="text-sm font-medium">{booking.service?.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Event Date</p>
                      <p className="text-sm font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="p-6 flex items-center justify-between md:justify-end gap-6 md:w-1/4 border-t md:border-t-0 md:border-l">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1 text-center">Status</p>
                      <Badge 
                        variant="outline" 
                        className={
                          booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-700 border-green-200' : 
                          booking.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                          'bg-red-50 text-red-700 border-red-200'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border-2 border-dashed">
            <p className="text-muted-foreground italic">You haven't made any bookings yet.</p>
            <Button className="mt-4" variant="outline">Browse Vendors</Button>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}