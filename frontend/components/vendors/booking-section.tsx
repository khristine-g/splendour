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
}

export function BookingSection({ vendor }: BookingSectionProps) {
  const { user } = useAuth()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  const [eventDate, setEventDate] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleBooking = async () => {
    // 1. Auth Guard: Redirect if not logged in
    if (!user) {
      router.push('/auth/login')
      return
    }

    // 2. Local Validation: Ensure fields are filled
    if (!selectedService || !eventDate) {
      setError("Please pick a service and a valid date.")
      return
    }
    
    setLoading(true)
    setError(null)

    // Field Mapping: Find service to get the price
    const service = vendor.services.find((s: any) => s.id === selectedService)

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: user.id, // Direct Auth Access
          vendorId: vendor.id,
          serviceId: selectedService,
          eventDate,
          totalAmount: service.price
        })
      })

      if (res.ok) {
        setBooked(true)
      } else {
        const data = await res.json()
        setError(data.error || "Booking failed. Please try again.")
      }
    } catch (err) {
      console.error(err)
      setError("Server connection lost. Is the backend running?")
    } finally {
      setLoading(false)
    }
  }

  // --- REFINED SUCCESS UI ---
  if (booked) {
    return (
      <Card className="border-green-500 bg-green-50/40 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <CardContent className="pt-10 pb-8 text-center">
          <div className="relative mx-auto h-20 w-20 mb-6">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20" />
            <div className="relative h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-serif text-green-900">Request Received!</h3>
          <p className="text-sm text-green-800/70 mt-3 px-6 leading-relaxed">
            Your booking request for **{vendor.name}** has been sent. You can track the status in your dashboard.
          </p>
          <Button 
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white gap-2 group"
            onClick={() => router.push('/client/dashboard')}
          >
            Go to My Dashboard <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  // --- MAIN BOOKING FORM ---
  return (
    <Card className="sticky top-24 shadow-2xl border-accent/10 overflow-hidden bg-card/80 backdrop-blur-sm">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <CardTitle className="font-serif text-2xl tracking-tight">Reserve Your Date</CardTitle>
        <p className="text-xs opacity-70 mt-1 uppercase tracking-widest font-semibold">Secure availability instantly</p>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6 p-6">
        {/* UI Error Block */}
        {error && (
          <div className="flex items-start gap-3 p-3 text-xs font-medium text-red-600 bg-red-50 rounded-lg border border-red-100 animate-in slide-in-from-top-1">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Service Selection: Field Mapping s.title */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Select Service</label>
          <Select onValueChange={(val) => { setSelectedService(val); setError(null); }}>
            <SelectTrigger className="h-12 border-accent/20 focus:ring-primary bg-background">
              <SelectValue placeholder="Choose a service package..." />
            </SelectTrigger>
            <SelectContent>
              {vendor.services?.map((s: any) => (
                <SelectItem key={s.id} value={s.id} className="py-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{s.title}</span>
                    <span className="text-[11px] text-primary font-bold mt-0.5">${s.price.toLocaleString()}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Selection: Date Constraint (min) */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Event Date</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input 
              type="date" 
              min={new Date().toISOString().split('T')[0]} // Date Validation: No past dates
              className={cn(
                "flex h-12 w-full rounded-md border border-accent/20 bg-background px-10 py-2 text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all appearance-none"
              )}
              onChange={(e) => { setEventDate(e.target.value); setError(null); }}
            />
          </div>
        </div>

        {/* Dynamic Button Text & State */}
        <Button 
          className={cn(
            "w-full py-7 text-lg font-bold shadow-lg transition-all active:scale-95",
            !user 
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-none border border-accent/10" 
              : "shadow-primary/20 hover:shadow-primary/30"
          )} 
          disabled={loading}
          onClick={handleBooking}
        >
          {loading ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : !user ? (
            <span className="flex items-center gap-2">
              <Lock className="h-5 w-5" /> Sign In to Book
            </span>
          ) : (
            "Confirm Booking Request"
          )}
        </Button>

        <div className="space-y-2 text-center pt-4 border-t border-accent/5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
            Splendour Verification
          </p>
          <p className="text-[10px] text-muted-foreground leading-relaxed px-4">
            Confirmation is sent immediately to the vendor. No funds are held until your date is confirmed.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}