//app/client/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { 
  Calendar, 
  Clock, 
  Loader2, 
  ShoppingBag, 
  ArrowUpRight, 
  Wallet, 
  Activity, 
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Booking {
  id: string
  status: string 
  eventDate: string
  totalAmount: number
  vendor: {
    name: string
    category: string
  }
  service: {
    title: string
  }
}

export default function ClientDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [bookings, setBookings] = useState<Booking[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const activeUserId = user?.id || JSON.parse(localStorage.getItem('user') || '{}').id

    if (activeUserId) {
      fetch(`http://localhost:5000/api/clients/${activeUserId}/bookings`)
        .then((res) => res.json())
        .then((data) => {
          const result = Array.isArray(data) ? data : (data.bookings || [])
          setBookings(result)
          setDataLoading(false)
        })
        .catch((err) => {
          console.error('Failed to fetch bookings:', err)
          setDataLoading(false)
        })
    }
  }, [user])

  // --- UPDATED LOGIC ---
  // Total Spent now only counts 'PAID' status
  const totalSpent = bookings
    .filter(b => b.status === 'PAID')
    .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0)

  const activeCount = bookings.filter(
    (b) => b.status === 'ACCEPTED' || b.status === 'PENDING'
  ).length

  const handlePayment = async (booking: Booking) => {
    setPaymentLoading(booking.id)
    try {
      const res = await fetch('http://localhost:5000/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          amount: booking.totalAmount,
          email: user?.email,
          name: user?.name
        })
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error("Payment gateway unavailable")
      }
    } catch (err) {
      toast.error("Could not initiate M-Pesa payment")
    } finally {
      setPaymentLoading(null)
    }
  }

  if (authLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Resuming your session...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <DashboardShell userType="client" userName={user.name}>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-slate-900 text-white shadow-xl border-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between opacity-80">
              <span className="text-xs uppercase tracking-widest font-bold">Total Spent</span>
              <Wallet className="h-4 w-4 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">KSh {totalSpent.toLocaleString()}</div>
            <p className="text-[10px] mt-1 opacity-50 italic">Confirmed payments only</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-primary">
              <span className="text-xs uppercase tracking-widest font-bold">Action Required</span>
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{activeCount}</div>
            <p className="text-[10px] mt-1 text-primary/70 italic">Pending or Unpaid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 text-muted-foreground">
             <span className="text-xs uppercase tracking-widest font-bold">History</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookings.length}</div>
            <p className="text-[10px] mt-1 text-muted-foreground italic tracking-tighter uppercase">Total Transactions</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm overflow-hidden border-border/50">
        <CardHeader className="border-b bg-muted/30 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Event Timeline
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          {dataLoading ? (
            <div className="flex h-48 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : bookings.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center gap-4">
               <Sparkles className="h-12 w-12 text-muted-foreground/20" />
               <p className="text-xl font-serif font-bold text-primary">No bookings yet</p>
               <Button asChild><Link href="/vendors">Browse Services</Link></Button>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/5 transition-all">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-lg text-slate-900">{booking.vendor?.name}</h4>
                      <Badge className={cn(
                        "capitalize text-[10px] font-bold tracking-widest px-2",
                        booking.status === 'PAID' && "bg-emerald-100 text-emerald-700 border-none",
                        booking.status === 'ACCEPTED' && "bg-blue-100 text-blue-700 border-none animate-pulse",
                        booking.status === 'PENDING' && "bg-amber-100 text-amber-700 border-none",
                        booking.status === 'REJECTED' && "bg-red-100 text-red-700 border-none"
                      )}>
                        {booking.status.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-500">{booking.service?.title}</p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 font-bold uppercase tracking-tighter">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(booking.eventDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right px-4">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Amount</p>
                      <p className="font-bold text-xl text-slate-900">KSh {booking.totalAmount.toLocaleString()}</p>
                    </div>

                    {/* DYNAMIC ACTION BUTTON */}
                    {booking.status === 'ACCEPTED' && (
  <Button 
    onClick={() => handlePayment(booking)}
    disabled={paymentLoading === booking.id}
    className={cn(
      "bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 rounded-xl",
      "border-2 border-emerald-700 shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]", // Retro shadow for visibility
      "transition-all active:translate-y-1 active:shadow-none"
    )}
  >
    {paymentLoading === booking.id ? (
      <Loader2 className="h-4 h-4 animate-spin" />
    ) : (
      <div className="flex items-center gap-2">
        <Wallet className="h-4 w-4" strokeWidth={3} />
        <span className="tracking-tighter">PAY WITH M-PESA</span>
      </div>
    )}
  </Button>
)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}