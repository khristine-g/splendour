
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Loader2,
  Store,
  ArrowLeft,
  ArrowRight,
  Search,
  Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { VendorProfile } from '@/components/vendors/vendor-profile'

export default function VendorDetailsPage() {
  const params = useParams()
  const id = params.id as string

  const [vendor, setVendor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchVendor = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vendors`,
          { signal: controller.signal }
        )

        if (!res.ok) {
          throw new Error('Unable to load vendors.')
        }

        const data = await res.json()

        const vendors = Array.isArray(data)
          ? data
          : data.vendors ?? data.data ?? []

        const selectedVendor = vendors.find(
          (item: any) => String(item.id) === String(id)
        )

        if (!selectedVendor) {
          throw new Error('Vendor not found.')
        }

        setVendor(selectedVendor)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return

        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong while loading this vendor.'
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    if (id) fetchVendor()

    return () => controller.abort()
  }, [id])

  // Loading state
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F3E9] px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-sm flex-col items-center text-center"
        >
          <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#E8DECE] bg-[#FFFCF6] shadow-[0_12px_35px_-15px_rgba(33,26,20,0.2)]">
            <div className="absolute inset-0 animate-ping rounded-[28px] border border-[#C7A36A]/30" />

            <Sparkles className="h-8 w-8 text-[#C7A36A]" />
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A18455]">
            Splendour experiences
          </p>

          <h1 className="font-serif text-3xl tracking-tight text-[#211A14]">
            Something beautiful
            <br />
            is loading.
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#817568]">
            We're preparing this vendor's profile for you.
          </p>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C7A36A]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C7A36A] [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C7A36A] [animation-delay:300ms]" />
          </div>
        </motion.div>
      </main>
    )
  }

  // Error / vendor not found state
  if (error || !vendor) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F3E9] px-6 py-20">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#E8DECE]/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#E5D7C5]/40 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-xl"
        >
          <div className="rounded-[32px] border border-[#E8DECE] bg-[#FFFCF6] px-7 py-14 text-center shadow-[0_25px_80px_-35px_rgba(33,26,20,0.2)] sm:px-14 sm:py-16">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#F5F0E9]">
              <Store className="h-9 w-9 text-[#A18455]" strokeWidth={1.5} />
            </div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A18455]">
              A little detour
            </p>

            <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#211A14] sm:text-5xl">
              We couldn't find
              <br />
              this vendor.
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#817568]">
              {error === 'Vendor not found.'
                ? "It looks like this vendor profile may have moved or is no longer available."
                : error || "The vendor you're looking for isn't available right now."}
            </p>

            <div className="mx-auto my-9 h-px w-16 bg-[#C7A36A]" />

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/vendors"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#211A14] px-7 py-3 text-sm font-semibold text-[#FFFCF6] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#984653]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Explore vendors
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#E8DECE] px-7 py-3 text-sm font-semibold text-[#51463C] transition-all duration-300 hover:border-[#C7A36A] hover:bg-[#F8F3E9]"
              >
                Back to home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <p className="mt-7 text-center font-serif text-sm italic text-[#A3978E]">
            Making every celebration a little more special.
          </p>
        </motion.div>
      </main>
    )
  }

  // Vendor profile
  return <VendorProfile vendor={vendor} />
}

