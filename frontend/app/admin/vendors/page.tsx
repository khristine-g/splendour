
'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowDownUp,
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  Search,
  Sparkles,
  Store,
  Trash2,
  Users,
} from 'lucide-react'
import { toast } from 'sonner'
import { AddVendorModal } from '@/components/dashboard/add-vendor-modal'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Vendor = {
  id: string
  name?: string
  cover?: string
  avatar?: string
  category?: string
  tagline?: string
  location?: string
  featured?: boolean
}

const palette = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: '#E8DECE',
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'newest' | 'name'>('newest')

  const load = useCallback(async () => {
    if (!API_URL) {
      setLoading(false)
      toast.error('API URL is not configured.')
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/vendors`)

      if (!res.ok) throw new Error('Failed to fetch vendors')

      const data = await res.json()
      setVendors(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Failed to load vendors')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const deleteVendor = async (id: string) => {
    if (!API_URL || deletingId) return

    const confirmed = window.confirm(
      'Are you sure you want to remove this vendor? This may also remove their associated services.'
    )

    if (!confirmed) return

    setDeletingId(id)

    try {
      const res = await fetch(`${API_URL}/api/vendors/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Delete failed')

      setVendors((current) => current.filter((vendor) => vendor.id !== id))
      toast.success('Vendor removed successfully')
    } catch {
      toast.error('Failed to delete vendor')
    } finally {
      setDeletingId(null)
    }
  }

  const filteredVendors = vendors
    .filter((vendor) => {
      const query = search.toLowerCase().trim()

      if (!query) return true

      return [
        vendor.name,
        vendor.category,
        vendor.location,
        vendor.tagline,
      ].some((value) => value?.toLowerCase().includes(query))
    })
    .sort((a, b) => {
      if (sortOrder === 'name') {
        return (a.name || '').localeCompare(b.name || '')
      }

      return 0
    })

  const categories = new Set(
    vendors.map((vendor) => vendor.category).filter(Boolean)
  ).size

  return (
    <main
      className="min-h-screen px-4 py-7 sm:px-7 sm:py-10 lg:px-10"
      style={{ backgroundColor: palette.ivory, color: palette.espresso }}
    >
      <div className="mx-auto max-w-7xl space-y-9">
        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span
                className="h-px w-8"
                style={{ backgroundColor: palette.gold }}
              />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: '#927044' }}
              >
                Splendour Administration
              </span>
              <Sparkles
                className="h-3.5 w-3.5"
                style={{ color: palette.gold }}
              />
            </div>

            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Marketplace <span className="italic" style={{ color: '#A47D47' }}>vendors.</span>
            </h1>

            <p
              className="mt-3 max-w-xl text-sm leading-6 sm:text-base"
              style={{ color: palette.muted }}
            >
              Manage your creative partners, keep your marketplace curated,
              and welcome exceptional event professionals.
            </p>
          </div>

          <div className="shrink-0">
            <AddVendorModal onSuccess={load} />
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={<Store className="h-5 w-5" />}
            label="Total vendors"
            value={loading ? '—' : vendors.length.toString().padStart(2, '0')}
            note="Across your marketplace"
          />

          <SummaryCard
            icon={<Building2 className="h-5 w-5" />}
            label="Categories"
            value={loading ? '—' : categories.toString().padStart(2, '0')}
            note="Distinct vendor categories"
          />

          <SummaryCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Featured partners"
            value={
              loading
                ? '—'
                : vendors
                    .filter((vendor) => vendor.featured)
                    .length.toString()
                    .padStart(2, '0')
            }
            note="Highlighted in the marketplace"
          />
        </section>

        {/* Vendor listing toolbar */}
        <section className="space-y-5">
          <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between"
            style={{ borderColor: palette.border }}
          >
            <div>
              <h2 className="font-serif text-2xl font-medium">
                Your vendor collection
              </h2>
              <p className="mt-1 text-sm" style={{ color: palette.muted }}>
                A closer look at the businesses on Splendour.
              </p>
            </div>

            <span
              className="w-fit rounded-full border px-3.5 py-2 text-xs font-medium"
              style={{
                backgroundColor: palette.cream,
                borderColor: palette.border,
                color: palette.muted,
              }}
            >
              {loading ? 'Loading...' : `${filteredVendors.length} vendors`}
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: palette.muted }}
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by business, category or location..."
                aria-label="Search vendors"
                className="h-12 w-full rounded-xl border pl-11 pr-4 text-sm outline-none transition focus:border-[#C7A36A] focus:ring-2 focus:ring-[#C7A36A]/15"
                style={{
                  backgroundColor: palette.cream,
                  borderColor: palette.border,
                  color: palette.espresso,
                }}
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setSortOrder((current) =>
                  current === 'newest' ? 'name' : 'newest'
                )
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition hover:bg-[#F1E7D8]"
              style={{
                backgroundColor: palette.cream,
                borderColor: palette.border,
                color: palette.espresso,
              }}
            >
              <ArrowDownUp className="h-4 w-4" />
              {sortOrder === 'newest' ? 'Default order' : 'Name: A–Z'}
            </button>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    backgroundColor: palette.cream,
                    borderColor: palette.border,
                  }}
                >
                  <div className="h-44 animate-pulse bg-[#EDE3D4]" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-[#EDE3D4]" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-[#F0E8DC]" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-[#F0E8DC]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVendors.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredVendors.map((vendor, index) => (
                <article
                  key={vendor.id}
                  className="group relative overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5A4020]/10"
                  style={{
                    backgroundColor: palette.cream,
                    borderColor: palette.border,
                  }}
                >
                  {/* Cover image */}
                  <div className="relative h-48 overflow-hidden bg-[#EDE3D4]">
                    {vendor.cover ? (
                      <Image
                        src={vendor.cover}
                        alt={`${vendor.name || 'Vendor'} cover`}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Store
                          className="h-10 w-10"
                          style={{ color: '#B7A58B' }}
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#211A14]/55 via-transparent to-[#211A14]/10" />

                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span
                        className="rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md"
                        style={{
                          backgroundColor: 'rgba(255,252,246,0.92)',
                          borderColor: 'rgba(255,255,255,0.6)',
                          color: '#76572F',
                        }}
                      >
                        {vendor.category || 'Uncategorized'}
                      </span>
                    </div>

                    {vendor.featured && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#E3C18A]/60 bg-[#211A14]/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F5D8A7] backdrop-blur-md">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    )}

                    <span className="absolute bottom-4 left-4 font-serif text-sm italic text-white/90">
                      Partner No. {String(index + 1).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      onClick={() => deleteVendor(vendor.id)}
                      disabled={deletingId !== null}
                      aria-label={`Delete ${vendor.name || 'vendor'}`}
                      title="Delete vendor"
                      className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#211A14]/55 text-white opacity-100 backdrop-blur-md transition hover:border-red-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Vendor details */}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="-mt-10 flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[3px] shadow-sm"
                        style={{
                          backgroundColor: '#EFE4D2',
                          borderColor: palette.cream,
                        }}
                      >
                        {vendor.avatar ? (
                          <Image
                            src={vendor.avatar}
                            alt={`${vendor.name || 'Vendor'} avatar`}
                            width={58}
                            height={58}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Store
                            className="h-6 w-6"
                            style={{ color: '#927044' }}
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 pt-1">
                        <h3 className="truncate font-serif text-xl font-medium leading-tight">
                          {vendor.name || 'Unnamed vendor'}
                        </h3>
                        <p
                          className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                          style={{ color: '#927044' }}
                        >
                          {vendor.category || 'Category pending'}
                        </p>
                      </div>

                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        title="Listed in marketplace"
                        style={{ backgroundColor: '#77916B' }}
                      />
                    </div>

                    <p
                      className="mt-5 min-h-[42px] text-sm leading-6"
                      style={{ color: palette.muted }}
                    >
                      {vendor.tagline || 'This partner is part of the Splendour marketplace.'}
                    </p>

                    <div
                      className="mt-4 flex items-center gap-2 border-t pt-4 text-xs"
                      style={{
                        borderColor: palette.border,
                        color: palette.muted,
                      }}
                    >
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: palette.gold }}
                      />
                      <span className="truncate">
                        {vendor.location || 'Location not provided'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              className="rounded-2xl border border-dashed px-5 py-16 text-center sm:py-20"
              style={{
                backgroundColor: palette.cream,
                borderColor: '#DCCBB0',
              }}
            >
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: '#EFE4D2', color: '#927044' }}
              >
                {search ? (
                  <Search className="h-6 w-6" />
                ) : (
                  <Users className="h-6 w-6" />
                )}
              </div>

              <h3 className="mt-5 font-serif text-2xl">
                {search ? 'No matching vendors.' : 'Your collection starts here.'}
              </h3>

              <p
                className="mx-auto mt-2 max-w-md text-sm leading-6"
                style={{ color: palette.muted }}
              >
                {search
                  ? 'Try a different search term or check the spelling.'
                  : 'Add your first event professional to begin building your curated marketplace.'}
              </p>

              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="mt-6 rounded-full border px-5 py-3 text-sm font-medium transition hover:bg-[#F1E7D8]"
                  style={{ borderColor: palette.border }}
                >
                  Clear search
                </button>
              ) : (
                <div className="mt-6 inline-flex">
                  <AddVendorModal onSuccess={load} />
                </div>
              )}
            </div>
          )}
        </section>

        {/* Footer note */}
        {!loading && vendors.length > 0 && (
          <footer
            className="flex flex-col gap-2 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: palette.border, color: palette.muted }}
          >
            <p>Thoughtfully managing the people behind unforgettable events.</p>
            <p className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: '#77916B' }}
              />
              Marketplace management
              <ArrowRight className="h-3 w-3" />
            </p>
          </footer>
        )}
      </div>
    </main>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode
  label: string
  value: string
  note: string
}) {
  return (
    <div
      className="group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#5A4020]/5 sm:p-6"
      style={{
        backgroundColor: palette.cream,
        borderColor: palette.border,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium" style={{ color: palette.muted }}>
            {label}
          </p>
          <p className="mt-3 font-serif text-3xl font-medium tracking-tight">
            {value}
          </p>
        </div>

        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl border transition-colors group-hover:bg-[#EFE4D2]"
          style={{
            backgroundColor: '#F7EFE3',
            borderColor: '#E9DCC7',
            color: '#927044',
          }}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs" style={{ color: palette.muted }}>
        {note}
      </p>
    </div>
  )
}
