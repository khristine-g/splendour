// app/admin/vendors/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, MapPin } from 'lucide-react'
import { AddVendorModal } from '@/components/dashboard/add-vendor-modal'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!API_URL) return

    try {
      const res = await fetch(`${API_URL}/api/vendors`)

      if (!res.ok) throw new Error('Failed to fetch vendors')

      const data = await res.json()
      setVendors(data || [])
    } catch (err) {
      toast.error("Failed to load vendors")
    } finally {
      setLoading(false)
    }
  }

  const deleteVendor = async (id: string) => {
    if (!API_URL) return
    if (!confirm("Are you sure? This will remove the vendor and all their services.")) return

    try {
      const res = await fetch(`${API_URL}/api/vendors/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Delete failed')

      toast.success("Vendor removed")
      load()
    } catch (err) {
      toast.error("Failed to delete vendor")
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-slate-500 font-serif italic">
        Loading vendors...
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold italic text-slate-900">
            Marketplace Vendors
          </h1>
          <p className="text-slate-500 text-sm">
            Manage active businesses and onboarding
          </p>
        </div>

        <AddVendorModal onSuccess={load} />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.length > 0 ? (
          vendors.map((v) => (
            <Card
              key={v.id}
              className="border-none shadow-sm overflow-hidden bg-white group hover:shadow-md transition-shadow"
            >
              {/* COVER */}
              <div className="h-32 bg-slate-100 relative">
                <img
                  src={v.cover || "/placeholder-cover.jpg"}
                  className="w-full h-full object-cover"
                  alt={v.name || "Vendor"}
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

              {/* CONTENT */}
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={v.avatar || "/placeholder-avatar.png"}
                    className="w-12 h-12 rounded-full border-2 border-white -mt-10 shadow-sm object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-slate-800 leading-tight">
                      {v.name || "Unnamed Vendor"}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-primary/70">
                      {v.category || "Uncategorized"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="text-sm text-slate-600 italic line-clamp-1">
                    "{v.tagline || 'No tagline'}"
                  </p>

                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <MapPin className="w-3 h-3" />
                    {v.location || "No location"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-slate-400 col-span-full">
            No vendors found
          </p>
        )}
      </div>
    </div>
  )
}