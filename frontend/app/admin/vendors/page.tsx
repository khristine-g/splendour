'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { AddServiceModal } from '@/components/dashboard/add-service-modal'

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<any[]>([])

  const load = async () => {
    const res = await fetch('http://localhost:5000/api/vendors')
    if (res.ok) setVendors(await res.json())
  }

  useEffect(() => { load() }, [])

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-serif font-bold italic">Vendors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendors.map(v => (
          <Card key={v.id} className="border-none shadow-sm p-4 bg-white">
            <div className="flex justify-between mb-4">
              <span className="font-bold">{v.name}</span>
              <Button size="icon" variant="ghost" className="hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
            </div>
            <AddServiceModal vendorId={v.id} onSuccess={load} />
          </Card>
        ))}
      </div>
    </div>
  )
}