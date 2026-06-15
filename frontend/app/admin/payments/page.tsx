// app/admin/payments/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminPaymentsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!API_URL) return

    const fetchPayments = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/activity`)

        if (!res.ok) throw new Error('Failed to fetch payments')

        const data = await res.json()
        setBookings(data.bookings || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-slate-500 font-serif italic">
        Loading payments...
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-serif font-bold italic">
        Payments
      </h1>

      <Card className="bg-white border-none shadow-sm p-4">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center py-3 border-b last:border-0"
            >
              <div>
                <p className="text-sm font-bold">
                  {b.service?.title}
                </p>
                <p className="text-[10px] text-slate-400">
                  Paid by {b.client?.name}
                </p>
              </div>

              <span className="text-green-600 font-bold">
                KSh {b.totalAmount}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 text-center py-6">
            No payments found
          </p>
        )}
      </Card>
    </div>
  )
}