'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
// 1. Import BOTH the component and the type
import { VendorCard, type Vendor } from '@/components/vendors/vendor-card'

export function FeaturedVendors() {
  // 2. Set the state type to Vendor[]
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vendors')
        if (!response.ok) throw new Error('Failed to fetch')
        
        const data = await response.json()
        
        // 3. Filter for featured and cast to the Vendor type
        const featuredData = (data as Vendor[])
          .filter((v) => v.featured)
          .slice(0, 4)
          
        setVendors(featuredData)
      } catch (error) {
        console.error("Error loading featured vendors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs font-bold uppercase tracking-widest">Top Rated</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl tracking-tight">
              Featured Vendors
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked professionals loved by our community
            </p>
          </div>
          
          <Button variant="ghost" className="hidden items-center gap-2 text-primary hover:bg-primary/5 sm:flex" asChild>
            <Link href="/vendors">
              Browse All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="mt-12 flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            <p className="mt-4 text-sm text-muted-foreground font-medium">Curating top vendors...</p>
          </div>
        ) : vendors.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((vendor) => (
              /* 4. Pass the 'vendor' object to the component. 
                 The red lines should be gone now! */
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="mt-12 py-10 text-center border rounded-2xl border-dashed">
            <p className="text-muted-foreground">No featured vendors found in the database.</p>
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Button variant="outline" className="w-full rounded-xl py-6" asChild>
            <Link href="/vendors">
              View All Vendors <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}