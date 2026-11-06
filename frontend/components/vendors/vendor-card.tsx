//components/vendors/vendor-card.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Star,
} from 'lucide-react'

export interface Vendor {
  id: string
  name: string
  category: string
  tagline: string
  avatar: string
  coverImage: string
  rating: number
  reviewCount: number
  startingPrice: number
  location: string
  verified: boolean
  featured: boolean
}

interface VendorCardProps {
  vendor: Vendor
}

const colors = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: '#E8DECE',
}

export function VendorCard({ vendor }: VendorCardProps) {
  if (!vendor) return null

  const hasRating =
    typeof vendor.rating === 'number' && Number.isFinite(vendor.rating)

  const hasPrice =
    typeof vendor.startingPrice === 'number' &&
    Number.isFinite(vendor.startingPrice)

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        backgroundColor: colors.cream,
        color: colors.espresso,
      }}
    >
      {/* Vendor photography */}
      <Link
        href={`/vendors/${vendor.id}`}
        aria-label={`View ${vendor.name}'s profile`}
        className="relative block h-56 shrink-0 overflow-hidden sm:h-52 lg:h-56"
      >
        {vendor.coverImage ? (
          <Image
            src={vendor.coverImage}
            alt={`${vendor.name} cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center"
            style={{ backgroundColor: '#EDE3D4' }}
          >
            <span
              className="font-serif text-4xl italic"
              style={{ color: '#A18A6B' }}
            >
              {vendor.name?.charAt(0) || 'S'}
            </span>
          </div>
        )}

        {/* Editorial image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#211A14]/50 via-transparent to-[#211A14]/10" />

        {/* Category label */}
        <div className="absolute left-4 top-4">
          <span
            className="inline-flex max-w-[190px] items-center truncate rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255,252,246,0.94)',
              borderColor: 'rgba(255,255,255,0.65)',
              color: '#76572F',
            }}
          >
            {vendor.category || 'Event professional'}
          </span>
        </div>

        {/* Featured label */}
        {vendor.featured && (
          <div className="absolute right-4 top-4">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(33,26,20,0.76)',
                borderColor: 'rgba(227,193,138,0.55)',
                color: '#F5D8A7',
              }}
            >
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Image footer */}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-white">
            {vendor.verified && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1.5 text-[10px] font-medium backdrop-blur-md">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#E3C18A]" />
                Verified
              </span>
            )}
          </div>

          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-[#211A14]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Main content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Avatar and vendor name */}
        <div className="flex items-start gap-3">
          <div
            className="-mt-10 relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-2xl border-[3px] shadow-sm"
            style={{
              backgroundColor: '#EFE4D2',
              borderColor: colors.cream,
            }}
          >
            {vendor.avatar ? (
              <Image
                src={vendor.avatar}
                alt={`${vendor.name} profile`}
                fill
                sizes="58px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-serif text-xl">
                {vendor.name?.charAt(0) || 'S'}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <h3
                className="truncate font-serif text-xl font-medium leading-tight tracking-tight"
                title={vendor.name}
              >
                {vendor.name}
              </h3>

              {vendor.verified && (
                <CheckCircle2
                  className="h-4 w-4 shrink-0"
                  style={{ color: '#64866A' }}
                  aria-label="Verified vendor"
                />
              )}
            </div>

            <div
              className="mt-1.5 flex items-center gap-1.5 text-xs"
              style={{ color: colors.muted }}
            >
              <MapPin
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: colors.gold }}
              />
              <span className="truncate">
                {vendor.location || 'Location not listed'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="mt-5 line-clamp-2 min-h-[44px] text-[13px] leading-[1.7]"
          style={{ color: colors.muted }}
        >
          {vendor.tagline || 'Creating memorable experiences for your special occasions.'}
        </p>

        {/* Rating and price */}
        <div
          className="mt-5 flex items-center justify-between gap-3 border-t pt-4"
          style={{ borderColor: colors.border }}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <Star
                className="h-4 w-4 fill-current"
                style={{ color: colors.gold }}
              />
              <span className="text-sm font-semibold">
                {hasRating ? vendor.rating.toFixed(1) : 'New'}
              </span>
              {hasRating && (
                <span className="text-xs" style={{ color: colors.muted }}>
                  ({vendor.reviewCount ?? 0})
                </span>
              )}
            </div>

            <p
              className="mt-1 text-[9px] font-medium uppercase tracking-[0.13em]"
              style={{ color: colors.muted }}
            >
              {hasRating && vendor.reviewCount > 0
                ? 'Client reviews'
                : 'Client rating'}
            </p>
          </div>

          <div className="text-right">
            <p
              className="text-[9px] font-medium uppercase tracking-[0.16em]"
              style={{ color: colors.muted }}
            >
              Starting at
            </p>

            <p
              className="mt-1 font-serif text-xl font-medium tracking-tight"
              style={{ color: colors.espresso }}
            >
              {hasPrice
                ? `KSh ${vendor.startingPrice.toLocaleString('en-KE')}`
                : 'Contact for price'}
            </p>
          </div>
        </div>

        {/* Profile CTA */}
        <Link
          href={`/vendors/${vendor.id}`}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A36A] focus-visible:ring-offset-2"
          style={{
            backgroundColor: colors.espresso,
            borderColor: colors.espresso,
            color: colors.cream,
          }}
        >
          View vendor profile

          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  )
}
