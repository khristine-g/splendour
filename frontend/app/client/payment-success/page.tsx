'use client'

import { CheckCircle2, ArrowRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl border-none rounded-3xl overflow-hidden">
        <div className="bg-emerald-600 p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Payment Received!</h1>
          <p className="text-emerald-100 text-sm mt-2">Your booking is now officially confirmed.</p>
        </div>
        
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-slate-500 text-sm">What happens next?</p>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left">
              <ul className="space-y-3 text-sm font-medium text-slate-700">
                <li className="flex gap-3">
                  <span className="text-emerald-600">01.</span>
                  The vendor is being notified of your payment.
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600">02.</span>
                  Check your email for the digital receipt.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="bg-slate-900 h-12 rounded-xl font-bold">
              <Link href="/client/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild className="text-slate-500 font-bold">
              <Link href="/vendors">Book Another Service</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}