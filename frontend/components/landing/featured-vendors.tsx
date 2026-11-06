
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Loader2,
  Star,
  Sparkles,
} from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { VendorCard, type Vendor } from '@/components/vendors/vendor-card'

const colors = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: '#E8DECE',
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

export function FeaturedVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const controller = new AbortController()

    async function fetchFeatured() {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vendors`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch vendors')
        }

        const data: Vendor[] = await response.json()

        setVendors(
          data.filter((vendor) => vendor.featured).slice(0, 4)
        )
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return

        console.error('Error loading featured vendors:', err)
        setError(true)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchFeatured()

    return () => controller.abort()
  }, [])

  const reveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.15 },
      }

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: colors.ivory, color: colors.espresso }}
    >
      {/* Subtle decorative background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-16 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(199, 163, 106, 0.10)' }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(227, 193, 138, 0.12)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <motion.div
          {...reveal}
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease: 'easeOut' },
            },
          }}
          className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-px w-9"
                style={{ backgroundColor: colors.gold }}
              />

              <span
                className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs"
                style={{ color: '#927044' }}
              >
                The Splendour Edit
              </span>

              <Sparkles
                className="h-3.5 w-3.5"
                style={{ color: colors.gold }}
              />
            </div>

            <h2
              className="font-serif text-4xl font-medium leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: colors.espresso }}
            >
              Exceptional people.
              <br />

              <span
                className="italic"
                style={{ color: '#A47D47' }}
              >
                Unforgettable moments.
              </span>
            </h2>

            <p
              className="mt-5 max-w-xl text-sm leading-7 sm:text-base"
              style={{ color: colors.muted }}
            >
              Meet the talented professionals who turn your vision into
              a celebration worth remembering.
            </p>
          </div>

          {/* Desktop browse link */}
          <Link
            href="/vendors"
            className="group hidden shrink-0 items-center gap-3 border-b pb-2 text-sm font-medium transition-colors md:inline-flex"
            style={{
              color: colors.espresso,
              borderColor: colors.gold,
            }}
          >
            Discover all vendors

            <span
              className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1"
              style={{
                backgroundColor: '#EFE4D2',
                color: '#76572F',
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>

        {/* Small editorial divider */}
        <div className="mt-10 flex items-center gap-4 sm:mt-12">
          <span
            className="h-px flex-1"
            style={{ backgroundColor: colors.border }}
          />

          <span
            className="text-[9px] font-medium uppercase tracking-[0.24em]"
            style={{ color: '#A29483' }}
          >
            Handpicked for you
          </span>

          <span
            className="h-px flex-1"
            style={{ backgroundColor: colors.border }}
          />
        </div>

        {/* Loading state */}
        {loading ? (
          <div
            className="mt-10 flex min-h-72 flex-col items-center justify-center rounded-3xl border"
            style={{
              backgroundColor: colors.cream,
              borderColor: colors.border,
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: '#EFE4D2' }}
            >
              <Loader2
                className="h-6 w-6 animate-spin"
                style={{ color: '#927044' }}
              />
            </div>

            <p
              className="mt-5 font-serif text-xl italic"
              style={{ color: colors.espresso }}
            >
              Finding your perfect match...
            </p>

            <p
              className="mt-2 text-xs"
              style={{ color: colors.muted }}
            >
              Discovering exceptional event professionals
            </p>
          </div>
        ) : error ? (
          /* Error state */
          <div
            className="mt-10 rounded-3xl border px-6 py-16 text-center"
            style={{
              backgroundColor: colors.cream,
              borderColor: colors.border,
            }}
          >
            <p
              className="font-serif text-2xl"
              style={{ color: colors.espresso }}
            >
              We couldn&apos;t load our featured vendors.
            </p>

            <p
              className="mt-3 text-sm"
              style={{ color: colors.muted }}
            >
              Please try again in a moment or explore all vendors.
            </p>

            <Link
              href="/vendors"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{
                backgroundColor: colors.espresso,
                color: colors.cream,
              }}
            >
              Explore vendors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : vendors.length > 0 ? (
          <>
            {/* Vendor grid */}
            <motion.div
              key={vendors.map((vendor) => vendor.id).join('-')}
              {...reveal}
              variants={containerVariants}
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-5"
            >
              {vendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  variants={itemVariants}
                  whileHover={reduceMotion ? undefined : { y: -7 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="group relative min-w-0"
                >
                  {/* Number detail above each card */}
                  <div className="mb-3 flex items-center justify-between px-1">
                    <span
                      className="font-serif text-sm italic"
                      style={{ color: '#A18A6B' }}
                    >
                      0{index + 1}
                    </span>

                    {vendor.featured && (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{
                          color: '#896638',
                          backgroundColor: '#F1E6D4',
                          borderColor: '#E6D4B6',
                        }}
                      >
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div
                    className="h-full overflow-hidden rounded-2xl border transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#5A4020]/10"
                    style={{
                      backgroundColor: colors.cream,
                      borderColor: colors.border,
                    }}
                  >
                    <VendorCard vendor={vendor} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom editorial CTA */}
            <motion.div
              {...reveal}
              variants={itemVariants}
              className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl border px-6 py-8 sm:flex-row sm:px-9"
              style={{
                backgroundColor: '#F1E7D8',
                borderColor: '#E4D5BE',
              }}
            >
              <div className="text-center sm:text-left">
                <p
                  className="font-serif text-2xl italic sm:text-3xl"
                  style={{ color: colors.espresso }}
                >
                  Your vision deserves the best.
                </p>

                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: colors.muted }}
                >
                  Explore more talent and find the right fit for your event.
                </p>
              </div>

              <Link
                href="/vendors"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: colors.espresso,
                  color: colors.cream,
                }}
              >
                Explore all vendors

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </>
        ) : (
          /* Empty state */
          <div
            className="mt-10 rounded-3xl border border-dashed px-6 py-16 text-center sm:py-20"
            style={{
              backgroundColor: colors.cream,
              borderColor: '#DCCBB0',
            }}
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: '#EFE4D2' }}
            >
              <Sparkles
                className="h-6 w-6"
                style={{ color: '#927044' }}
              />
            </div>

            <h3
              className="mt-5 font-serif text-2xl sm:text-3xl"
              style={{ color: colors.espresso }}
            >
              Something wonderful is in the making.
            </h3>

            <p
              className="mx-auto mt-3 max-w-md text-sm leading-6"
              style={{ color: colors.muted }}
            >
              Our featured collection is being curated. In the meantime,
              explore all the talented professionals on Splendour.
            </p>

            <Link
              href="/vendors"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{
                backgroundColor: colors.espresso,
                color: colors.cream,
              }}
            >
              Browse all vendors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/vendors"
            className="flex w-full items-center justify-center gap-2 rounded-full border px-5 py-4 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: colors.cream,
              color: colors.espresso,
              borderColor: colors.border,
            }}
          >
            View all vendors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}


