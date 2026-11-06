
'use client'

import { useAuth } from '@/context/auth-context'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  CheckCircle,
  Star,
  Award,
  Loader2,
  Lock,
  Camera,
  LayoutGrid,
  Info,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { ServiceCard } from './service-card'
import { BookingSection } from './booking-section'

const colors = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  border: '#E8DECE',
}

export function VendorProfile({ vendor }: { vendor: any }) {
  const { user, loading: authLoading } = useAuth()

  const services = vendor?.services || []
  const portfolio = vendor?.portfolio || []
  const reviews = vendor?.reviews || []

  const hasPortfolio = portfolio.length > 0
  const hasServices = services.length > 0

  if (authLoading) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-5 px-6"
        style={{ backgroundColor: colors.ivory }}
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl border"
          style={{
            backgroundColor: colors.cream,
            borderColor: colors.border,
          }}
        >
          <Loader2
            className="h-7 w-7 animate-spin"
            style={{ color: colors.gold }}
          />
        </div>

        <div className="text-center">
          <p
            className="font-serif text-2xl"
            style={{ color: colors.espresso }}
          >
            Preparing something beautiful
          </p>
          <p className="mt-2 text-sm" style={{ color: colors.muted }}>
            Loading vendor profile...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen pb-20"
      style={{
        backgroundColor: colors.ivory,
        color: colors.espresso,
      }}
    >
      {/* Cover image */}
      <section className="relative h-[280px] w-full overflow-hidden sm:h-[360px] lg:h-[430px]">
        <Image
          src={vendor.coverImage || '/placeholder-cover.jpg'}
          alt={`${vendor.name} cover`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#211A14]/75 via-[#211A14]/10 to-[#211A14]/20" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 lg:px-8">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F5D8A7]">
            <Sparkles className="h-3.5 w-3.5" />
            Discover exceptional event professionals
          </p>

          <p className="font-serif text-3xl italic text-white sm:text-4xl">
            Every celebration deserves something special.
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vendor introduction */}
        <section className="relative z-10 -mt-12 rounded-[28px] border p-5 shadow-[0_20px_60px_-30px_rgba(33,26,20,0.22)] sm:-mt-16 sm:p-8 lg:p-10"
          style={{
            backgroundColor: colors.cream,
            borderColor: colors.border,
          }}
        >
          <div className="flex flex-col gap-7 md:flex-row md:items-center">
            {/* Avatar */}
            <div
              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[24px] border-[5px] shadow-lg sm:h-36 sm:w-36"
              style={{
                backgroundColor: '#EFE4D2',
                borderColor: colors.cream,
              }}
            >
              <Image
                src={vendor.avatar || '/placeholder-avatar.png'}
                alt={vendor.name}
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>

            {/* Vendor details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1
                  className="font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl"
                  style={{ color: colors.espresso }}
                >
                  {vendor.name}
                </h1>

                {vendor.verified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D8E4D6] bg-[#EFF5ED] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#557557]">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified
                  </span>
                )}
              </div>

              {vendor.tagline && (
                <p
                  className="mt-3 max-w-2xl font-serif text-lg italic leading-relaxed sm:text-xl"
                  style={{ color: colors.muted }}
                >
                  &ldquo;{vendor.tagline}&rdquo;
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                {vendor.location && (
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: colors.muted }}
                  >
                    <MapPin
                      className="h-4 w-4"
                      style={{ color: colors.gold }}
                    />
                    {vendor.location}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Star
                    className="h-4 w-4 fill-current"
                    style={{ color: colors.gold }}
                  />
                  <span className="font-semibold">
                    {vendor.rating ?? 'New'}
                  </span>
                  <span style={{ color: colors.muted }}>
                    ({vendor.reviewCount ?? 0} reviews)
                  </span>
                </div>

                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: colors.muted }}
                >
                  <Award
                    className="h-4 w-4"
                    style={{ color: colors.gold }}
                  />
                  <span>
                    {vendor.completedEvents || 0} successful events
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div
            className="mt-8 grid grid-cols-1 gap-3 border-t pt-6 sm:grid-cols-3"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F0E9]">
                <ShieldCheck
                  className="h-5 w-5"
                  style={{ color: colors.gold }}
                />
              </div>
              <div>
                <p className="text-xs font-semibold">Trusted professional</p>
                <p className="mt-0.5 text-[11px]" style={{ color: colors.muted }}>
                  Quality you can feel confident in
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F0E9]">
                <Star
                  className="h-5 w-5"
                  style={{ color: colors.gold }}
                />
              </div>
              <div>
                <p className="text-xs font-semibold">Client experiences</p>
                <p className="mt-0.5 text-[11px]" style={{ color: colors.muted }}>
                  {vendor.reviewCount ?? 0} client reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F0E9]">
                <Award
                  className="h-5 w-5"
                  style={{ color: colors.gold }}
                />
              </div>
              <div>
                <p className="text-xs font-semibold">Event experience</p>
                <p className="mt-0.5 text-[11px]" style={{ color: colors.muted }}>
                  {vendor.completedEvents || 0} events completed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile content and booking */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Left column */}
          <section className="min-w-0 lg:col-span-2">
            <div className="mb-7">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                style={{ color: colors.gold }}
              >
                Explore the collection
              </p>

              <h2
                className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-4xl"
                style={{ color: colors.espresso }}
              >
                Discover their work
              </h2>

              <p
                className="mt-2 text-sm leading-6"
                style={{ color: colors.muted }}
              >
                Explore services, browse previous celebrations and get to know
                the team behind the experience.
              </p>
            </div>

            <Tabs defaultValue="services" className="w-full">
              <TabsList
                className="flex h-auto w-full justify-start gap-7 overflow-x-auto rounded-none border-b p-0"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: colors.border,
                }}
              >
                <TabsTrigger
                  value="services"
                  className="gap-2 rounded-none border-b-2 border-transparent px-1 pb-4 pt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#817568] shadow-none transition-all data-[state=active]:border-[#C7A36A] data-[state=active]:bg-transparent data-[state=active]:text-[#211A14] data-[state=active]:shadow-none"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Services
                </TabsTrigger>

                <TabsTrigger
                  value="portfolio"
                  className="gap-2 rounded-none border-b-2 border-transparent px-1 pb-4 pt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#817568] shadow-none transition-all data-[state=active]:border-[#C7A36A] data-[state=active]:bg-transparent data-[state=active]:text-[#211A14] data-[state=active]:shadow-none"
                >
                  <Camera className="h-4 w-4" />
                  Portfolio
                </TabsTrigger>

                <TabsTrigger
                  value="about"
                  className="gap-2 rounded-none border-b-2 border-transparent px-1 pb-4 pt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#817568] shadow-none transition-all data-[state=active]:border-[#C7A36A] data-[state=active]:bg-transparent data-[state=active]:text-[#211A14] data-[state=active]:shadow-none"
                >
                  <Info className="h-4 w-4" />
                  About
                </TabsTrigger>
              </TabsList>

              {/* Services */}
              <TabsContent
                value="services"
                className="pt-8 focus-visible:outline-none"
              >
                {hasServices ? (
                  <>
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-2xl" style={{ color: colors.espresso }}>
                          Services & experiences
                        </h3>
                        <p className="mt-1 text-xs" style={{ color: colors.muted }}>
                          {services.length} {services.length === 1 ? 'service' : 'services'} available
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {services.map((service: any) => (
                        <ServiceCard
                          key={service.id}
                          service={{ ...service, vendor }}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center rounded-[24px] border border-dashed px-6 py-20 text-center"
                    style={{
                      backgroundColor: colors.cream,
                      borderColor: colors.border,
                    }}
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F0E9]">
                      <LayoutGrid
                        className="h-6 w-6"
                        style={{ color: colors.gold }}
                      />
                    </div>

                    <h3 className="font-serif text-xl">
                      Services coming soon
                    </h3>
                    <p
                      className="mt-2 max-w-xs text-sm leading-6"
                      style={{ color: colors.muted }}
                    >
                      This vendor hasn&apos;t listed any services yet. Please
                      check back soon.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Portfolio */}
              <TabsContent
                value="portfolio"
                className="pt-8 focus-visible:outline-none"
              >
                <div className="mb-6">
                  <h3 className="font-serif text-2xl" style={{ color: colors.espresso }}>
                    A glimpse of their work
                  </h3>
                  <p className="mt-1 text-xs" style={{ color: colors.muted }}>
                    Moments, details and celebrations they have brought to life.
                  </p>
                </div>

                {hasPortfolio ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {portfolio.map((img: string, index: number) => (
                      <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-2xl"
                        style={{ backgroundColor: '#EDE3D4' }}
                      >
                        <Image
                          src={img}
                          alt={`${vendor.name} portfolio item ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#211A14]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center rounded-[24px] border border-dashed px-6 py-20 text-center"
                    style={{
                      backgroundColor: colors.cream,
                      borderColor: colors.border,
                    }}
                  >
                    <Camera
                      className="mb-5 h-8 w-8"
                      style={{ color: colors.gold }}
                    />
                    <h3 className="font-serif text-xl">
                      Their portfolio is on its way
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: colors.muted }}>
                      This vendor hasn&apos;t added portfolio images yet.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* About */}
              <TabsContent
                value="about"
                className="pt-8 focus-visible:outline-none"
              >
                <div
                  className="rounded-[24px] border p-6 sm:p-8"
                  style={{
                    backgroundColor: colors.cream,
                    borderColor: colors.border,
                  }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: colors.gold }}
                  >
                    The story behind the service
                  </p>

                  <h3
                    className="mt-3 font-serif text-3xl"
                    style={{ color: colors.espresso }}
                  >
                    About {vendor.name}
                  </h3>

                  <div
                    className="my-6 h-px w-16"
                    style={{ backgroundColor: colors.gold }}
                  />

                  <p
                    className="whitespace-pre-line text-sm leading-8"
                    style={{ color: colors.muted }}
                  >
                    {vendor.description ||
                      'Welcome to our profile. We are dedicated to making your event special.'}
                  </p>

                  {vendor.location && (
                    <div
                      className="mt-8 flex items-center gap-3 border-t pt-5"
                      style={{ borderColor: colors.border }}
                    >
                      <MapPin
                        className="h-5 w-5"
                        style={{ color: colors.gold }}
                      />
                      <div>
                        <p className="text-xs font-semibold">Based in</p>
                        <p className="mt-1 text-sm" style={{ color: colors.muted }}>
                          {vendor.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Client reviews, when available */}
            {reviews.length > 0 && (
              <section className="mt-12">
                <div className="mb-6">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: colors.gold }}
                  >
                    Words from our clients
                  </p>
                  <h3
                    className="mt-2 font-serif text-3xl"
                    style={{ color: colors.espresso }}
                  >
                    Client experiences
                  </h3>
                </div>

                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review: any) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border p-5 sm:p-6"
                      style={{
                        backgroundColor: colors.cream,
                        borderColor: colors.border,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#EFE4D2]">
                          {review.authorAvatar && (
                            <Image
                              src={review.authorAvatar}
                              alt={review.authorName || 'Client'}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold">
                              {review.authorName || 'Client'}
                            </p>

                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3.5 w-3.5 ${
                                    star <= (review.rating || 0)
                                      ? 'fill-current'
                                      : ''
                                  }`}
                                  style={{
                                    color: star <= (review.rating || 0)
                                      ? colors.gold
                                      : '#D8CFC2',
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {review.comment && (
                            <p
                              className="mt-3 text-sm leading-7"
                              style={{ color: colors.muted }}
                            >
                              &ldquo;{review.comment}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </section>

          {/* Booking sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-5 lg:sticky lg:top-28">
              {user ? (
                <BookingSection vendor={vendor} clientId={user.id} />
              ) : (
                <div
                  className="overflow-hidden rounded-[26px] border shadow-[0_15px_45px_-25px_rgba(33,26,20,0.25)]"
                  style={{
                    backgroundColor: colors.cream,
                    borderColor: colors.border,
                  }}
                >
                  <div
                    className="px-6 py-6"
                    style={{ backgroundColor: colors.espresso }}
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D8B77F]">
                      Your celebration starts here
                    </p>

                    <h3 className="mt-3 font-serif text-2xl text-white">
                      Make it memorable.
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-white/65">
                      Connect with this vendor and start planning something
                      wonderful.
                    </p>
                  </div>

                  <div className="space-y-5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F0E9]">
                        <Lock
                          className="h-5 w-5"
                          style={{ color: colors.gold }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Booking access
                        </p>
                        <p
                          className="mt-0.5 text-[11px]"
                          style={{ color: colors.muted }}
                        >
                          Client account required
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-sm leading-7"
                      style={{ color: colors.muted }}
                    >
                      To protect our community, please log in with your client
                      account to view pricing details and request a booking.
                    </p>

                    <Button
                      asChild
                      className="h-12 w-full rounded-full bg-[#211A14] text-xs font-semibold text-[#FFFCF6] shadow-none transition-all hover:-translate-y-0.5 hover:bg-[#984653]"
                    >
                      <Link href="/auth/login">
                        Login to book
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <p
                      className="text-center text-[11px]"
                      style={{ color: colors.muted }}
                    >
                      New to Splendour?{' '}
                      <Link
                        href="/auth/register"
                        className="font-semibold underline underline-offset-4"
                        style={{ color: colors.espresso }}
                      >
                        Create an account
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Payment reassurance */}
              <div
                className="rounded-2xl border p-5"
                style={{
                  backgroundColor: '#F2EDE3',
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: colors.gold }}
                  />
                  <div>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: colors.espresso }}
                    >
                      Secure payments
                    </p>
                    <p
                      className="mt-2 text-xs leading-6"
                      style={{ color: colors.muted }}
                    >
                      Your funds are held in escrow and only released once the
                      event is successfully completed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Closing note */}
              <div className="px-4 py-3 text-center">
                <p
                  className="font-serif text-lg italic"
                  style={{ color: colors.muted }}
                >
                  Making every celebration a little more special.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
