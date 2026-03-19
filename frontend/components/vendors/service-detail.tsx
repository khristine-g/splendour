// frontend/components/vendors/service-detail.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// Note: We no longer import the 'vendors' array from mock-data
// because the vendor is now nested inside the service object from the DB.

interface ServiceDetailProps {
  service: any // Use your Service type, but ensure it includes the vendor object
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  // Prisma returns the vendor as a nested object: service.vendor
  const vendor = service.vendor;

  const priceLabel =
    service.priceType === 'per_person'
      ? `$${service.price} / person`
      : service.priceType === 'per_hour'
      ? `$${service.price} / hour`
      : `$${service.price?.toLocaleString()} flat`

  return (
    <div className="min-h-screen bg-secondary/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/vendors/${vendor?.id}`}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {vendor?.name || 'Vendor'}
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <Badge className="absolute left-4 top-4" variant="secondary">
                {service.category}
              </Badge>
            </div>

            <Card>
              <CardContent className="p-6">
                <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  {service.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={vendor?.avatar || '/default-avatar.png'}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link
                      href={`/vendors/${vendor?.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {vendor?.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">{service.rating}</span>
                    <span className="text-sm text-muted-foreground">({service.reviewCount} reviews)</span>
                  </div>
                  {service.duration && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </div>
                  )}
                </div>

                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>

            {/* What's included */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  What&apos;s Included
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.inclusions?.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Client Reviews - Updated for Database Vendor structure */}
            {vendor?.reviews && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-lg font-semibold text-foreground">
                    Client Reviews
                  </h2>
                  <div className="mt-4 space-y-4">
                    {/* Note: In a real DB, you'd fetch reviews separately, 
                        but if they are in your seed data, we map them here */}
                    {vendor.reviews.slice(0, 3).map((review: any) => (
                      <div key={review.id} className="flex items-start gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                          <Image src={review.authorAvatar} alt="" fill className="object-cover" sizes="36px" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">{review.authorName}</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className={`h-3 w-3 ${s <= review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking sidebar */}
          <div className="lg:sticky lg:top-6 h-fit space-y-4">
            <Card className="border-2 border-primary shadow-lg">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-serif text-3xl font-bold text-primary">{priceLabel}</p>
                {service.priceType === 'per_person' && (
                  <p className="text-xs text-muted-foreground">Minimum guests apply</p>
                )}

                <Button
                  className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  asChild
                >
                  <Link href={`/booking?serviceId=${service.id}`}>
                    Book This Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  No payment until vendor confirms
                </p>
              </CardContent>
            </Card>

            {vendor && (
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground">About the Vendor</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{vendor.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="text-xs">{vendor.rating} ({vendor.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full" size="sm" asChild>
                    <Link href={`/vendors/${vendor.id}`}>View Full Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}