'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, Star } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/vendors?search=${encodeURIComponent(query)}`)
    else router.push('/vendors')
  }

  
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
     
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">

        
          <motion.div
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent"
          >
            <Star className="h-3.5 w-3.5 fill-accent" />
            <span>Trusted by 3,000+ clients across Kenya</span>
          </motion.div>

         
          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Your Perfect Event
            <br />
            <span className="text-accent">Starts Here</span>
          </motion.h1>

        
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80"
          >
            Discover and book Kenya&apos;s finest photographers, caterers,
            decorators, DJs, MCs, and more — all in one place.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full px-8">
                <Link href="/booking">Book Now</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/10 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8">
                <Link href="/vendors">Browse Vendors</Link>
              </Button>
            </motion.div>
          </motion.div>

         
          <motion.form
            variants={fadeUp}
            onSubmit={handleSearch}
            className="mt-8 flex w-full max-w-lg mx-auto overflow-hidden rounded-full border border-accent/30 bg-background/10 backdrop-blur"
          >
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="h-4 w-4 shrink-0 text-primary-foreground/60" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search photographers, caterers, DJs..."
                className="flex-1 bg-transparent py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none"
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="m-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
              >
                Search
              </Button>
            </motion.div>
          </motion.form>

       
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-xs text-primary-foreground/60">Popular:</span>
            {['Wedding Photography', 'Catering', 'DJ', 'Decoration', 'MC'].map((tag) => (
              <motion.div
                key={tag}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                <Link
                  href={`/vendors?search=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
                >
                  {tag}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-primary-foreground/20"
        >
          {[
            { label: 'Verified Vendors', value: '142+' },
            { label: 'Events Completed', value: '1,847' },
            { label: 'Happy Clients', value: '3,291' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="px-6 text-center first:pl-0 last:pr-0"
            >
              <p className="font-serif text-3xl font-bold text-accent">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}