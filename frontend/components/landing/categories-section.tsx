'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Camera,
  UtensilsCrossed,
  Palette,
  Disc3,
  Mic2,
  Video,
  Flower2,
  LayoutGrid,
  Loader2,
} from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type Category = {
  name: string
  count: number
}

const iconMap: Record<string, React.ElementType> = {
  Photography: Camera,
  Catering: UtensilsCrossed,
  Decoration: Palette,
  DJ: Disc3,
  MC: Mic2,
  Videography: Video,
  Floral: Flower2,
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching categories:', err)
        setCategories([])
        setLoading(false)
      })
  }, [])

  // ✅ Variants (typed)
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }} // ✅ animate every time
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Explore Categories
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Real-time availability across all specialties.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-100px' }} // ✅ re-triggers on scroll
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.name] || LayoutGrid

            return (
              <motion.div key={cat.name} variants={item}>
                <Link
                  href={`/vendors?category=${encodeURIComponent(cat.name)}`}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      'relative flex flex-col items-center justify-center gap-4 rounded-3xl p-6',
                      'bg-card/80 backdrop-blur border border-border',
                      'transition-all duration-300',
                      'hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10'
                    )}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-accent/5" />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent transition-all duration-300"
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>

                    {/* Text */}
                    <div className="relative z-10 text-center">
                      <p className="text-sm font-semibold tracking-tight">
                        {cat.name}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                        {cat.count} {cat.count === 1 ? 'Vendor' : 'Vendors'}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}