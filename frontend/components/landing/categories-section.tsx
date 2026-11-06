
'use client'

import { useState, useEffect } from 'react'
import type { ElementType } from 'react'
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
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

type Category = {
  name: string
  count: number
}

const iconMap: Record<string, ElementType> = {
  Photography: Camera,
  Catering: UtensilsCrossed,
  Decoration: Palette,
  DJ: Disc3,
  MC: Mic2,
  Videography: Video,
  Floral: Flower2,
}

const descriptions: Record<string, string> = {
  Photography: 'Capture the moments that matter.',
  Catering: 'Exceptional flavours, beautifully served.',
  Decoration: 'Create a setting worth remembering.',
  DJ: 'Set the mood for an unforgettable night.',
  MC: 'Bring every moment together seamlessly.',
  Videography: 'Relive your most beautiful memories.',
  Floral: 'Thoughtful blooms for your special day.',
}

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCategories() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        if (!apiUrl) {
          throw new Error('NEXT_PUBLIC_API_URL is not configured')
        }

        const response = await fetch(
          `${apiUrl}/api/categories`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }

        const data: Category[] = await response.json()

        setCategories(data)
        setError(false)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        console.error('Error fetching categories:', err)
        setError(true)
        setCategories([])
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCategories()

    return () => controller.abort()
  }, [])

  const sectionAnimation = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.15 },
      }

  return (
    <section className="relative isolate overflow-hidden bg-[#F8F3E9] py-20 text-[#17130F] sm:py-24 lg:py-28">

      {/* Subtle champagne glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-[#E3C18A]/20 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-[#C5A16A]/10 blur-[110px]"
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">

        {/* Section heading */}
        <motion.div
          {...sectionAnimation}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65 },
            },
          }}
          className="mb-12 flex flex-col gap-7 sm:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B18A53]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#94703F] sm:text-xs">
                Find your people
              </span>

              <Sparkles className="h-3.5 w-3.5 text-[#B18A53]" />
            </div>

            <h2 className="font-serif text-4xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              The art of
              <br />
              <span className="italic text-[#A47D47]">
                celebrating beautifully.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#756B5D] sm:text-base sm:leading-8">
              Every unforgettable event begins with the right
              people. Discover Kenya&apos;s talented event
              professionals and bring your vision to life.
            </p>
          </div>

          <Link
            href="/vendors"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#D9C9B0] bg-white/60 px-6 py-3.5 text-xs font-semibold text-[#30271D] transition-all duration-300 hover:border-[#B18A53] hover:bg-white hover:shadow-lg hover:shadow-[#17130F]/5 sm:text-sm"
          >
            Explore all vendors

            <ArrowUpRight className="h-4 w-4 text-[#A47D47] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex min-h-52 items-center justify-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-[#A47D47]" />

            <p className="text-sm text-[#756B5D]">
              Discovering your possibilities...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-3xl border border-[#E0D2BD] bg-white/70 px-6 py-14 text-center">
            <p className="font-serif text-2xl">
              We&apos;ll be right back.
            </p>

            <p className="mt-3 text-sm text-[#756B5D]">
              We couldn&apos;t load the categories. Please try again.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-[#17130F] px-7 py-3 text-sm font-medium text-[#F8F3E9] transition-colors hover:bg-[#34291D]"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && categories.length === 0 && (
          <div className="rounded-3xl border border-[#E0D2BD] bg-white/50 px-6 py-16 text-center">
            <LayoutGrid className="mx-auto h-8 w-8 text-[#B18A53]" />

            <p className="mt-5 font-serif text-2xl">
              Something wonderful is coming.
            </p>

            <p className="mt-3 text-sm text-[#756B5D]">
              Our event categories will appear here soon.
            </p>
          </div>
        )}

        {/* Category cards */}
        {!loading && !error && categories.length > 0 && (
          <motion.div
            {...sectionAnimation}
            variants={container}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-7"
          >
            {categories.map((cat, index) => {
              const Icon = iconMap[cat.name] || LayoutGrid

              return (
                <motion.div
                  key={cat.name}
                  variants={item}
                >
                  <Link
                    href={`/vendors?category=${encodeURIComponent(cat.name)}`}
                    className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border border-[#E7DCCB] bg-white/65 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C7A36E] hover:bg-white hover:shadow-[0_20px_50px_-25px_rgba(23,19,15,0.24)] sm:min-h-[255px] sm:p-6"
                  >
                    {/* Champagne hover accent */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#C5A16A] transition-transform duration-500 group-hover:scale-x-100"
                    />

                    {/* Card top row */}
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm text-[#A18B6D]">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <ArrowUpRight className="h-4 w-4 text-[#B18A53] opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </div>

                    {/* Icon */}
                    <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E6D6BB] bg-[#F5EBDD] text-[#987344] transition-all duration-300 group-hover:border-[#E3C18A] group-hover:bg-[#E3C18A]/35 group-hover:text-[#70502D]">
                      <Icon
                        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.6}
                      />
                    </div>

                    {/* Card content */}
                    <div className="mt-auto pt-6">
                      <h3 className="font-serif text-xl leading-tight tracking-[-0.025em] text-[#292117] sm:text-2xl">
                        {cat.name}
                      </h3>

                      <p className="mt-2 text-[11px] leading-5 text-[#817669]">
                        {descriptions[cat.name] ||
                          'Find the right professionals for your event.'}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-[#EEE5D8] pt-3">
                        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#8C8070]">
                          {cat.count}{' '}
                          {cat.count === 1 ? 'vendor' : 'vendors'}
                        </span>

                        <span className="text-[10px] font-medium text-[#A47D47] transition-colors group-hover:text-[#70502D]">
                          Discover
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Bottom editorial note */}
        {!loading && !error && categories.length > 0 && (
          <div className="mt-12 flex flex-col gap-4 border-t border-[#E1D5C3] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-[#B18A53]" />

              <p className="text-xs leading-6 text-[#756B5D]">
                Thoughtfully chosen vendors. Unforgettable celebrations.
              </p>
            </div>

            <Link
              href="/vendors"
              className="group inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#94703F] transition-colors hover:text-[#17130F]"
            >
              Find your perfect match

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
