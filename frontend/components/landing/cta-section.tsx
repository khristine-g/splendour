'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Store } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

export function CtaSection() {
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/40 text-foreground">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }} 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

         
          <motion.div variants={item}>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl text-foreground">
              Planning an event?
            </h2>

            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Browse hundreds of verified professionals and book your dream team in minutes.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
                asChild
              >
                <Link href="/vendors">
                  Find Vendors <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-border bg-card/80 backdrop-blur p-8 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 6, scale: 1.1 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent"
              >
                <Store className="h-6 w-6 text-accent-foreground" />
              </motion.div>

              <h3 className="font-serif text-xl font-semibold text-foreground">
                Are you a vendor?
              </h3>
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Join Kenya&apos;s fastest-growing event marketplace. Get discovered by thousands of
              clients, manage your bookings, and grow your business — all in one platform.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                'Free to join — no upfront costs',
                'Smart booking management tools',
                'Secure payment processing',
                'Verified vendor badge',
              ].map((listItem) => (
                <motion.li key={listItem} variants={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {listItem}
                </motion.li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                className="mt-8 border-border text-foreground hover:bg-secondary/50"
                asChild
              >
                <Link href="/auth/register?role=vendor">
                  Become a Vendor
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}