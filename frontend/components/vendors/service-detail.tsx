
import Image from 'next/image'
import Link from 'next/link'
import {
  Star,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ChevronLeft,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ServiceDetailProps {
  service: any
}

const colors = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  border: '#E8DECE',
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const vendor = service.vendor

  const priceLabel =
    service.priceType === 'per_person'
      ? `KSh ${Number(service.price || 0).toLocaleString('en-KE')} / person`
      : service.priceType === 'per_hour'
        ? `KSh ${Number(service.price || 0).toLocaleString('en-KE')} / hour`
        : `KSh ${Number(service.price || 0).toLocaleString('en-KE')}`

  const inclusions = service.inclusions || []
  const reviews = vendor?.reviews || []

  return (
    <main
      className="min-h-screen pb-20"
      style={{ backgroundColor: colors.ivory, color: colors.espresso }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
          <Link
            href="/vendors"
            className="transition-colors hover:text-[#C7A36A]"
            style={{ color: colors.muted }}
          >
            Explore vendors
          </Link>

          <span style={{ color: colors.gold }}>/</span>

          {vendor && (
            <>
              <Link
                href={`/vendors/${vendor.id}`}
                className="max-w-[180px] truncate transition-colors hover:text-[#C7A36A]"
                style={{ color: colors.muted }}
              >
                {vendor.name}
              </Link>
              <span style={{ color: colors.gold }}>/</span>
            </>
          )}

          <span className="font-medium" style={{ color: colors.espresso }}>
            {service.title}
          </span>
        </div>

        {/* Back link */}
        <Link
          href={vendor?.id ? `/vendors/${vendor.id}` : '/vendors'}
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold transition-all hover:-translate-x-1"
          style={{ color: colors.muted }}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {vendor?.name || 'vendors'}
        </Link>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Main content */}
          <div className="min-w-0 space-y-7 lg:col-span-2">
            {/* Service image */}
            <section>
              <div className="group relative h-[300px] overflow-hidden rounded-[28px] bg-[#EDE3D4] sm:h-[420px] lg:h-[500px]">
                <Image
                  src={service.image || '/placeholder-service.jpg'}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#211A14]/45 via-transparent to-[#211A14]/10" />

                {service.category && (
                  <div className="absolute left-5 top-5">
                    <span className="inline-flex items-center rounded-full border border-white/60 bg-[#FFFCF6]/95 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#76572F] shadow-sm backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#F5D8A7]">
                      <Sparkles className="h-3.5 w-3.5" />
                      A Splendour experience
                    </p>

                    <h1 className="max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                      {service.title}
                    </h1>
                  </div>
                </div>
              </div>
            </section>

            {/* Service overview */}
            <section
              className="rounded-[26px] border p-6 sm:p-8"
              style={{
                backgroundColor: colors.cream,
                borderColor: colors.border,
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: colors.gold }}
                  >
                    The experience
                  </p>

                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                    About this service
                  </h2>
                </div>

                {service.rating != null && (
                  <div className="flex items-center gap-2 rounded-full border px-3 py-2"
                    style={{ borderColor: colors.border }}
                  >
                    <Star
                      className="h-4 w-4 fill-current"
                      style={{ color: colors.gold }}
                    />
                    <span className="text-sm font-semibold">
                      {service.rating}
                    </span>
                    <span className="text-xs" style={{ color: colors.muted }}>
                      ({service.reviewCount ?? 0})
                    </span>
                  </div>
                )}
              </div>

              <p
                className="mt-6 whitespace-pre-line text-sm leading-8"
                style={{ color: colors.muted }}
              >
                {service.description ||
                  'Discover the details of this experience and connect with the vendor to make your celebration special.'}
              </p>

              <div
                className="mt-7 flex flex-wrap gap-6 border-t pt-6"
                style={{ borderColor: colors.border }}
              >
                {service.duration && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F0E9]">
                      <Clock
                        className="h-5 w-5"
                        style={{ color: colors.gold }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Duration</p>
                      <p className="mt-1 text-xs" style={{ color: colors.muted }}>
                        {service.duration}
                      </p>
                    </div>
                  </div>
                )}

                {vendor?.location && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F0E9]">
                      <MapPin
                        className="h-5 w-5"
                        style={{ color: colors.gold }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Vendor location</p>
                      <p className="mt-1 text-xs" style={{ color: colors.muted }}>
                        {vendor.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* What's included */}
            {inclusions.length > 0 && (
              <section
                className="rounded-[26px] border p-6 sm:p-8"
                style={{
                  backgroundColor: colors.cream,
                  borderColor: colors.border,
                }}
              >
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: colors.gold }}
                  >
                    The details matter
                  </p>

                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                    What&apos;s included
                  </h2>

                  <p
                    className="mt-2 text-xs leading-6"
                    style={{ color: colors.muted }}
                  >
                    Here&apos;s what you can expect when booking this service.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {inclusions.map((item: string, index: number) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-start gap-3 rounded-2xl border p-4 transition-colors hover:bg-[#F8F3E9]"
                      style={{ borderColor: colors.border }}
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F1EBDD]">
                        <CheckCircle
                          className="h-4 w-4"
                          style={{ color: colors.gold }}
                        />
                      </div>

                      <span className="pt-1 text-sm leading-6">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <section>
                <div className="mb-6">
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: colors.gold }}
                  >
                    Real experiences
                  </p>

                  <h2 className="mt-2 font-serif text-3xl">
                    Client reviews
                  </h2>

                  <p className="mt-2 text-xs" style={{ color: colors.muted }}>
                    What people are saying about {vendor?.name || 'this vendor'}.
                  </p>
                </div>

                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review: any) => (
                    <article
                      key={review.id}
                      className="rounded-[22px] border p-5 sm:p-6"
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
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm font-semibold">
                              {review.authorName || 'Client'}
                            </p>

                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3.5 w-3.5 ${
                                    star <= (review.rating || 0)
                                      ? 'fill-current'
                                      : ''
                                  }`}
                                  style={{
                                    color:
                                      star <= (review.rating || 0)
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
          </div>

          {/* Booking sidebar */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-8">
            {/* Price and booking */}
            <section
              className="overflow-hidden rounded-[26px] border shadow-[0_20px_60px_-35px_rgba(33,26,20,0.3)]"
              style={{
                backgroundColor: colors.cream,
                borderColor: colors.border,
              }}
            >
              <div
                className="px-6 py-6"
                style={{ backgroundColor: colors.espresso }}
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D8B77F]">
                  Reserve your experience
                </p>

                <h2 className="mt-2 font-serif text-2xl text-white">
                  Let&apos;s make it happen.
                </h2>
              </div>

              <div className="p-6">
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: colors.muted }}
                >
                  Starting price
                </p>

                <p
                  className="mt-2 break-words font-serif text-3xl font-medium tracking-tight sm:text-4xl"
                  style={{ color: colors.espresso }}
                >
                  {priceLabel}
                </p>

                {service.priceType === 'per_person' && (
                  <p
                    className="mt-2 text-xs"
                    style={{ color: colors.muted }}
                  >
                    Minimum guests may apply.
                  </p>
                )}

                <div
                  className="my-6 border-t"
                  style={{ borderColor: colors.border }}
                />

                <Button
                  asChild
                  size="lg"
                  className="h-13 w-full rounded-full bg-[#211A14] text-xs font-semibold text-[#FFFCF6] shadow-none transition-all hover:-translate-y-0.5 hover:bg-[#984653]"
                >
                  <Link href={`/booking?serviceId=${service.id}`}>
                    Book this service
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <div className="mt-5 flex items-center justify-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4"
                    style={{ color: colors.gold }}
                  />
                  <p className="text-[11px]" style={{ color: colors.muted }}>
                    No payment until vendor confirms
                  </p>
                </div>
              </div>
            </section>

            {/* Vendor card */}
            {vendor && (
              <section
                className="rounded-[24px] border p-5"
                style={{
                  backgroundColor: colors.cream,
                  borderColor: colors.border,
                }}
              >
                <p
                  className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: colors.gold }}
                >
                  Your service provider
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#EFE4D2]">
                    <Image
                      src={vendor.avatar || '/placeholder-avatar.png'}
                      alt={vendor.name || 'Vendor'}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {vendor.name}
                    </p>

                    {vendor.location && (
                      <p
                        className="mt-1 flex items-center gap-1 text-[11px]"
                        style={{ color: colors.muted }}
                      >
                        <MapPin className="h-3 w-3" />
                        {vendor.location}
                      </p>
                    )}

                    {vendor.rating != null && (
                      <div className="mt-1 flex items-center gap-1">
                        <Star
                          className="h-3 w-3 fill-current"
                          style={{ color: colors.gold }}
                        />
                        <span className="text-[11px] font-semibold">
                          {vendor.rating}
                        </span>
                        <span
                          className="text-[11px]"
                          style={{ color: colors.muted }}
                        >
                          ({vendor.reviewCount ?? 0} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-5 h-11 w-full rounded-full border-[#E8DECE] bg-transparent text-xs font-semibold text-[#211A14] hover:bg-[#F5F0E9]"
                >
                  <Link href={`/vendors/${vendor.id}`}>
                    View vendor profile
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </section>
            )}

            {/* Reassurance */}
            <div
              className="rounded-[20px] border p-5"
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
                  <p className="text-xs font-semibold">
                    A more confident way to plan
                  </p>

                  <p
                    className="mt-2 text-[11px] leading-6"
                    style={{ color: colors.muted }}
                  >
                    Your funds are held in escrow and only released once the
                    event is successfully completed.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
