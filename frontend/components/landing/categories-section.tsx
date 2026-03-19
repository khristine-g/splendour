// components/landing/categories-section.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, UtensilsCrossed, Palette, Disc3, Mic2, Video, Flower2, LayoutGrid, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  'Photography': Camera,
  'Catering': UtensilsCrossed,
  'Decoration': Palette,
  'DJ': Disc3,
  'MC': Mic2,
  'Videography': Video,
  'Floral': Flower2,
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<{name: string, count: number}[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch('http://localhost:5000/api/categories')
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((data) => {
      setCategories(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
      // Set to an empty array so the map doesn't fail
      setCategories([]); 
      setLoading(false);
    });
}, []);
  if (loading) return (
    <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
  )

  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Explore Categories</h2>
          <p className="mt-4 text-muted-foreground text-lg">Real-time availability across all specialties.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.name] || LayoutGrid
            return (
              <Link key={cat.name} href={`/vendors?category=${encodeURIComponent(cat.name)}`}>
                <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-card p-6 border border-border hover:border-accent hover:-translate-y-2 transition-all duration-300">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground group-hover:bg-accent">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold">{cat.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {cat.count} {cat.count === 1 ? 'Vendor' : 'Vendors'}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}