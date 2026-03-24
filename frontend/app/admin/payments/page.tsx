'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

export default function AdminPaymentsPage() {
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/activity')
      .then(res => res.json())
      .then(data => setBookings(data.bookings))
  }, [])

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-serif font-bold italic">Payments</h1>
      <Card className="bg-white border-none shadow-sm p-4">
        {bookings.map(b => (
          <div key={b.id} className="flex justify-between items-center py-3 border-b last:border-0">
            <div>
              <p className="text-sm font-bold">{b.service?.title}</p>
              <p className="text-[10px] text-slate-400">Paid by {b.client?.name}</p>
            </div>
            <span className="text-green-600 font-bold">KSh {b.totalAmount}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}