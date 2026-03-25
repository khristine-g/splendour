// app/admin/vendors/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Store, MapPin } from 'lucide-react'
import { AddVendorModal } from '@/components/dashboard/add-vendor-modal'
import { toast } from 'sonner'

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<any[]>([])

  const load = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vendors')
      if (res.ok) setVendors(await res.json())
    } catch (err) {
      toast.error("Failed to load vendors")
    }
  }

  const deleteVendor = async (id: string) => {
    if (!confirm("Are you sure? This will remove the vendor and all their services.")) return
    const res = await fetch(`http://localhost:5000/api/vendors/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success("Vendor removed")
      load()
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header with Global Add Action */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold italic text-slate-900">Marketplace Vendors</h1>
          <p className="text-slate-500 text-sm">Manage active businesses and onboarding</p>
        </div>
        
        {/* FIXED: Modal is now here at the top, no vendorId needed */}
        <AddVendorModal onSuccess={load} />
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map(v => (
          <Card key={v.id} className="border-none shadow-sm overflow-hidden bg-white group hover:shadow-md transition-shadow">
            {/* Cover Image */}
            <div className="h-32 bg-slate-100 relative">
               <img 
                 src={v.cover || "/placeholder-cover.jpg"} 
                 className="w-full h-full object-cover" 
                 alt={v.name} 
               />
               <div className="absolute top-2 right-2">
                 <Button 
                   size="icon" 
                   variant="destructive" 
                   className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                   onClick={() => deleteVendor(v.id)}
                 >
                   <Trash2 className="w-4 h-4" />
                 </Button>
               </div>
            </div>

            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src={v.avatar} className="w-12 h-12 rounded-full border-2 border-white -mt-10 shadow-sm" />
                <div>
                  <h3 className="font-bold text-slate-800 leading-tight">{v.name}</h3>
                  <span className="text-[10px] uppercase font-bold text-primary/70">{v.category}</span>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-sm text-slate-600 italic line-clamp-1">"{v.tagline}"</p>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <MapPin className="w-3 h-3" />
                  {v.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}