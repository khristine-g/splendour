'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, Loader2, CheckCircle, Lock, Info, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/context/auth-context' 
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface BookingSectionProps {
  vendor: any;
  clientId?: string; 
}

export function BookingSection({ vendor, clientId }: BookingSectionProps) {
  const { user } = useAuth()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  const [eventDate, setEventDate] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleBooking = async () => {

    if (!user || !user.id) {
      setError("Please login to complete your booking.")
      router.push('/auth/login')
      return
    }

   
    if (!selectedService || !eventDate) {
      setError("Please pick a service and a valid date.")
      return
    }
    
    setLoading(true)
    setError(null)

    const service = vendor.services?.find((s: any) => s.id === selectedService)

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: user.id, 
          vendorId: vendor.id,
          serviceId: selectedService,
          
          eventDate: new Date(eventDate).toISOString(),
          
          totalAmount: parseFloat(service?.price || 0)
        })
      })

      if (res.ok) {
        setBooked(true)
      } else {
        const data = await res.json()
  
        if (data.error?.includes('Foreign key')) {
          setError("Session Error: Please logout and login again to refresh your account ID.")
        } else {
          setError(data.error || "Booking failed. Please try again.")
        }
      }
    } catch (err) {
      setError("Server connection lost. Please check if the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  if (booked) {
    return (
      <Card className="border-green-500 bg-green-50/40 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <CardContent className="pt-10 pb-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold font-serif text-green-900">Request Sent!</h3>
          <p className="text-sm text-green-800/70 mt-3 px-6">
            Your booking request for **{vendor.name}** has been sent successfully.
          </p>
          <Button 
            className="mt-8 w-full bg-green-600 hover:bg-green-700"
            onClick={() => router.push('/client/dashboard')}
          >
            Go to My Dashboard
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-24 shadow-2xl border-accent/10 bg-card/80 backdrop-blur-sm">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <CardTitle className="font-serif text-2xl text-white">Reserve Your Date</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6 p-6">
        {error && (
          <div className="flex items-start gap-3 p-3 text-xs text-red-600 bg-red-50 rounded-lg border border-red-100 animate-in slide-in-from-top-2">
            <Info className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-muted-foreground">Select Service</label>
          <Select onValueChange={(val) => { setSelectedService(val); setError(null); }}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choose a package..." />
            </SelectTrigger>
            <SelectContent>
              {vendor.services?.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.title} - KSh {s.price?.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-muted-foreground">Event Date</label>
          <input 
            type="date" 
            min={new Date().toISOString().split('T')[0]} 
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            onChange={(e) => { setEventDate(e.target.value); setError(null); }}
          />
        </div>

        <Button 
          className="w-full py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all" 
          disabled={loading}
          onClick={handleBooking}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Sending...</span>
            </div>
          ) : (
            "Confirm Booking"
          )}
        </Button>
        
        <p className="text-[10px] text-center text-muted-foreground italic">
          Prices are inclusive of standard Kenyan service taxes where applicable.
        </p>
      </CardContent>
    </Card>
  )
}