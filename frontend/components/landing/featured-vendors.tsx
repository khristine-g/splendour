'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VendorCard, type Vendor } from '@/components/vendors/vendor-card'
import { motion, Variants } from 'framer-motion'

export function FeaturedVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vendors')
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        const featuredData = (data as Vendor[])
          .filter((v) => v.featured)
          .slice(0, 4)

        setVendors(featuredData)
      } catch (error) {
        console.error('Error loading featured vendors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  }

 
  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Top Rated
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl tracking-tight">
              Featured Vendors
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked professionals loved by our community
            </p>
          </div>

          <div className="hidden sm:flex">
            <Button
              variant="ghost"
              className="group items-center gap-2 text-primary hover:bg-primary/5"
              asChild
            >
              <Link href="/vendors">
                Browse All 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        
        {loading ? (
          <div className="mt-12 flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            <p className="mt-4 text-sm text-muted-foreground font-medium">
              Curating top vendors...
            </p>
          </div>
        ) : vendors.length > 0 ? (
         
          <motion.div
            key={vendors.length} 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {vendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                variants={item}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <VendorCard vendor={vendor} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mt-12 py-20 text-center border rounded-2xl border-dashed">
            <p className="text-muted-foreground">
              No featured vendors found in the database.
            </p>
          </div>
        )}

      
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center sm:hidden"
        >
          <Button variant="outline" className="w-full rounded-xl py-6" asChild>
            <Link href="/vendors">
              View All Vendors <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


