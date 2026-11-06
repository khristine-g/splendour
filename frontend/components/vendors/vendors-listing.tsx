
'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  ArrowDownUp,
  ArrowRight,
  Check,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  Loader2,
  Users,
} from 'lucide-react'
import { VendorCard, type Vendor } from '@/components/vendors/vendor-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const colors = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: '#E8DECE',
}

type Category = {
  name: string
}

type SortOption = 'rating' | 'price_low' | 'price_high'

export function VendorsListing() {
  const searchParams = useSearchParams()

  const [allVendors, setAllVendors] = useState<Vendor[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState<SortOption>('rating')

  const urlCategory = searchParams.get('category')

  const loadInitialData = useCallback(async (signal: AbortSignal) => {
    if (!API_URL) {
      setError(true)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(false)

      const [vendorsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/api/vendors`, { signal }),
        fetch(`${API_URL}/api/categories`, { signal }),
      ])

      if (!vendorsRes.ok) {
        throw new Error('Unable to load vendors')
      }

      const vendorsData = await vendorsRes.json()

      if (!Array.isArray(vendorsData)) {
        throw new Error('Invalid vendors response')
      }

      setAllVendors(vendorsData)

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } else {
        setCategories([])
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return

      console.error('Failed to load marketplace data:', err)
      setError(true)
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    void loadInitialData(controller.signal)

    return () => controller.abort()
  }, [loadInitialData])

  useEffect(() => {
    setCategory(urlCategory || 'All')
  }, [urlCategory])

  const filteredVendors = useMemo(() => {
    const query = search.trim().toLowerCase()

    return allVendors
      .filter((vendor) => {
        const matchesSearch =
          !query ||
          [vendor.name, vendor.location, vendor.category, vendor.tagline].some(
            (value) => value?.toLowerCase().includes(query)
          )

        const matchesCategory =
          category === 'All' || vendor.category === category

        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') {
          return (
            (a.startingPrice ?? Number.POSITIVE_INFINITY) -
            (b.startingPrice ?? Number.POSITIVE_INFINITY)
          )
        }

        if (sortBy === 'price_high') {
          return (
            (b.startingPrice ?? -1) -
            (a.startingPrice ?? -1)
          )
        }

        return (b.rating ?? 0) - (a.rating ?? 0)
      })
  }, [allVendors, search, category, sortBy])

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
  }

  return (
    <main
      className="min-h-screen pb-20"
      style={{ backgroundColor: colors.ivory, color: colors.espresso }}
    >
      {/* Editorial hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: colors.espresso }}
      >
        {/* Decorative background details */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(199,163,106,0.13)' }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-[15%] h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(227,193,138,0.07)' }}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="h-px w-9"
                  style={{ backgroundColor: colors.gold }}
                />

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs"
                  style={{ color: colors.goldLight }}
                >
                  The Splendour Directory
                </span>

                <Sparkles
                  className="h-3.5 w-3.5"
                  style={{ color: colors.gold }}
                />
              </div>

              <h1 className="font-serif text-5xl font-medium leading-[1.08] tracking-tight text-[#FFFCF6] sm:text-6xl lg:text-7xl">
                Find your people.
                <br />
                <span
                  className="italic"
                  style={{ color: colors.goldLight }}
                >
                  Create your moment.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#D1C5B5] sm:text-base sm:leading-8">
                Discover exceptional event professionals, explore their work,
                and find the right team to bring your celebration to life.
              </p>

              <div
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs"
                style={{ color: '#C8B9A5' }}
              >
                <span className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5" style={{ color: colors.goldLight }} />
                  Curated professionals
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5" style={{ color: colors.goldLight }} />
                  Find your perfect fit
                </span>
              </div>
            </div>

            <div
              className="hidden min-w-[170px] border-l pl-7 pb-1 lg:block"
              style={{ borderColor: 'rgba(227,193,138,0.35)' }}
            >
              <p
                className="font-serif text-5xl"
                style={{ color: colors.goldLight }}
              >
                {loading ? '—' : allVendors.length.toString().padStart(2, '0')}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D1C5B5]">
                Vendors to discover
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div
            className="mt-10 max-w-3xl rounded-2xl border p-2 sm:mt-12"
            style={{
              backgroundColor: colors.cream,
              borderColor: 'rgba(227,193,138,0.45)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}
          >
            <div className="flex items-center gap-3 px-3 sm:px-4">
              <Search
                className="h-5 w-5 shrink-0"
                style={{ color: '#927044' }}
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Try a photographer, decorator or location..."
                aria-label="Search vendors by name, category, tagline or location"
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#A99B89] sm:text-base"
                style={{ color: colors.espresso }}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-[#EFE4D2]"
                  style={{ color: colors.muted }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <span
                className="hidden h-8 w-px sm:block"
                style={{ backgroundColor: colors.border }}
              />

              <span
                className="hidden pr-3 text-[10px] font-semibold uppercase tracking-[0.14em] sm:block"
                style={{ color: '#927044' }}
              >
                Explore
              </span>
            </div>
          </div>
        </div>

        {/* Bottom gold rule */}
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, #C7A36A 25%, #E3C18A 50%, #C7A36A 75%, transparent)',
          }}
        />
      </section>

      {/* Listing area */}
      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14 lg:px-10">
        {/* Toolbar */}
        <div className="flex flex-col gap-6 border-b pb-6 sm:pb-8 lg:flex-row lg:items-end lg:justify-between"
          style={{ borderColor: colors.border }}
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-px w-6"
                style={{ backgroundColor: colors.gold }}
              />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.23em]"
                style={{ color: '#927044' }}
              >
                Find your match
              </span>
            </div>

            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              Explore the collection
            </h2>

            <p className="mt-2 text-sm" style={{ color: colors.muted }}>
              {loading
                ? 'Discovering talented event professionals...'
                : `${filteredVendors.length} ${filteredVendors.length === 1 ? 'professional' : 'professionals'} to explore`}
              {category !== 'All' ? ` in ${category}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] sm:inline-flex"
              style={{ color: colors.muted }}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Sort by
            </span>

            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger
                className="h-11 w-full rounded-xl border text-sm sm:w-[205px]"
                style={{
                  backgroundColor: colors.cream,
                  borderColor: colors.border,
                  color: colors.espresso,
                }}
              >
                <SelectValue placeholder="Sort vendors" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="price_low">Price: low to high</SelectItem>
                <SelectItem value="price_high">Price: high to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category filters */}
        <div className="py-6 sm:py-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: colors.muted }}
            >
              Browse by category
            </p>

            {(category !== 'All' || search) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium transition hover:opacity-70"
                style={{ color: '#927044' }}
              >
                Clear filters
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2">
            <CategoryChip
              active={category === 'All'}
              onClick={() => setCategory('All')}
            >
              All vendors
              <span
                className="ml-1 rounded-full px-1.5 py-0.5 text-[10px]"
                style={{
                  backgroundColor:
                    category === 'All' ? 'rgba(255,252,246,0.13)' : '#EFE4D2',
                }}
              >
                {allVendors.length}
              </span>
            </CategoryChip>

            {categories.map((cat) => (
              <CategoryChip
                key={cat.name}
                active={category === cat.name}
                onClick={() => setCategory(cat.name)}
              >
                {cat.name}
              </CategoryChip>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border"
                style={{
                  backgroundColor: colors.cream,
                  borderColor: colors.border,
                }}
              >
                <div className="h-56 animate-pulse bg-[#EDE3D4]" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#EDE3D4]" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-[#F0E8DC]" />
                  <div className="h-12 animate-pulse rounded-full bg-[#F0E8DC]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className="rounded-3xl border px-6 py-16 text-center"
            style={{
              backgroundColor: colors.cream,
              borderColor: colors.border,
            }}
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: '#EFE4D2', color: '#927044' }}
            >
              <X className="h-6 w-6" />
            </div>

            <h3 className="mt-5 font-serif text-2xl">
              We couldn&apos;t load the collection.
            </h3>

            <p className="mt-2 text-sm" style={{ color: colors.muted }}>
              Please check your connection and try again.
            </p>

            <button
              type="button"
              onClick={() => {
                const controller = new AbortController()
                void loadInitialData(controller.signal)
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{
                backgroundColor: colors.espresso,
                color: colors.cream,
              }}
            >
              Try again
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : filteredVendors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-3 border-t py-8 text-center sm:mt-16"
              style={{ borderColor: colors.border }}
            >
              <Sparkles
                className="h-4 w-4"
                style={{ color: colors.gold }}
              />
              <p className="font-serif text-xl italic">
                Every great event begins with the right people.
              </p>
              <p className="text-xs" style={{ color: colors.muted }}>
                Take your time. Find the team that feels right for your vision.
              </p>
            </div>
          </>
        ) : (
          <div
            className="rounded-3xl border border-dashed px-6 py-16 text-center sm:py-20"
            style={{
              backgroundColor: colors.cream,
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

            <h3 className="mt-5 font-serif text-2xl sm:text-3xl">
              {search || category !== 'All'
                ? 'No matches just yet.'
                : 'A wonderful collection is on its way.'}
            </h3>

            <p
              className="mx-auto mt-3 max-w-md text-sm leading-7"
              style={{ color: colors.muted }}
            >
              {search || category !== 'All'
                ? 'Try another search or category to discover more event professionals.'
                : 'There are no vendors to display right now. Check back soon for new additions.'}
            </p>

            {(search || category !== 'All') && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
                style={{
                  backgroundColor: colors.espresso,
                  color: colors.cream,
                }}
              >
                Reset filters
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
      style={
        active
          ? {
              backgroundColor: colors.espresso,
              color: colors.cream,
              borderColor: colors.espresso,
              boxShadow: '0 5px 15px rgba(33,26,20,0.12)',
            }
          : {
              backgroundColor: colors.cream,
              color: colors.muted,
              borderColor: colors.border,
            }
      }
    >
      {children}
    </button>
  )
}
