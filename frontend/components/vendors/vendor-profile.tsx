'use client'

import { useAuth } from '@/context/auth-context'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, CheckCircle, Star, Award, Loader2, Lock, Camera, LayoutGrid, Info } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ServiceCard } from './service-card'
import { BookingSection } from './booking-section'

export function VendorProfile({ vendor }: { vendor: any }) {
  const { user, loading: authLoading } = useAuth()

  // --- SAFETY CHECKS: Extract data from the backend response ---
  // This ensures that even if 'services' is missing from the JSON, the app doesn't crash.
  const services = vendor?.services || []
  const portfolio = vendor?.portfolio || []
  const hasPortfolio = portfolio.length > 0
  const hasServices = services.length > 0

  if (authLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. HEADER / COVER IMAGE */}
      <div className="relative h-64 w-full lg:h-80 xl:h-96">
        <Image
          src={vendor.coverImage || '/placeholder-cover.jpg'}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2. FLOATING PROFILE INFO CARD */}
        <div className="-mt-24 relative z-20 flex flex-col items-start gap-6 rounded-3xl bg-card p-6 shadow-2xl shadow-primary/5 border border-border lg:flex-row lg:items-center lg:p-10">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-card shadow-xl bg-muted sm:h-40 sm:w-40">
            <Image 
              src={vendor.avatar || '/placeholder-avatar.png'} 
              alt={vendor.name} 
              fill 
              className="object-cover" 
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl text-foreground">
                {vendor.name}
              </h1>
              {vendor.verified && (
                <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-100">
                  <CheckCircle className="h-3 w-3 fill-current" /> Verified
                </div>
              )}
            </div>
            
            <p className="mt-2 text-lg text-muted-foreground italic font-medium leading-relaxed">
              &quot;{vendor.tagline}&quot;
            </p>
            
            <div className="mt-6 flex flex-wrap gap-y-4 gap-x-8 text-sm font-semibold">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {vendor.location}
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-accent text-accent" /> 
                <span className="text-foreground">{vendor.rating}</span> 
                <span className="text-muted-foreground font-normal">({vendor.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-4 w-4 text-primary" /> {vendor.completedEvents || 0} Successful Events
              </div>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT TABS */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* LEFT COLUMN: TABS */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start gap-8 sm:gap-12">
                <TabsTrigger value="services" className="rounded-none py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-[0.2em] transition-all">
                  <LayoutGrid className="mr-2 h-4 w-4" /> Services
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="rounded-none py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-[0.2em] transition-all">
                  <Camera className="mr-2 h-4 w-4" /> Portfolio
                </TabsTrigger>
                <TabsTrigger value="about" className="rounded-none py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-[0.2em] transition-all">
                  <Info className="mr-2 h-4 w-4" /> About
                </TabsTrigger>
              </TabsList>

              {/* TABS CONTENT: SERVICES */}
              <TabsContent value="services" className="py-10 focus-visible:outline-none">
                {hasServices ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {services.map((service: any) => (
                      <ServiceCard key={service.id} service={{ ...service, vendor }} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-muted/30">
                    <LayoutGrid className="h-10 w-10 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground font-medium">No services currently listed.</p>
                  </div>
                )}
              </TabsContent>

              {/* TABS CONTENT: PORTFOLIO */}
              <TabsContent value="portfolio" className="py-10 focus-visible:outline-none">
                {hasPortfolio ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {portfolio.map((img: string, index: number) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5">
                        <Image 
                          src={img} 
                          alt={`Work piece ${index + 1}`} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-muted/30">
                    <Camera className="h-10 w-10 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground font-medium">This vendor hasn&apos;t added portfolio items yet.</p>
                  </div>
                )}
              </TabsContent>

              {/* TABS CONTENT: ABOUT */}
              <TabsContent value="about" className="py-10 focus-visible:outline-none">
                <div className="prose prose-slate max-w-none">
                  <Card className="border-none shadow-none bg-transparent p-0">
                    <CardContent className="p-0">
                      <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                        {vendor.description || "Welcome to our profile. We are dedicated to making your event special."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT COLUMN: BOOKING SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {user ? (
                <BookingSection vendor={vendor} clientId={user.id} />
              ) : (
                <Card className="border-2 border-accent/20 bg-accent/5 overflow-hidden rounded-3xl shadow-xl shadow-accent/5">
                  <CardHeader className="bg-accent/10 border-b border-accent/10">
                    <CardTitle className="text-lg flex items-center gap-2 text-accent-foreground">
                      <Lock className="h-5 w-5" />
                      Booking Restricted
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                      To protect our community, you must be logged in to a client account to view pricing details and request a booking.
                    </p>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold h-12 rounded-xl shadow-lg shadow-accent/20">
                      <Link href="/auth/login">Login to Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Secure Payment</p>
                  <p className="text-[11px] leading-snug text-muted-foreground font-medium">
                    Your funds are held in escrow and only released once the event is successfully completed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}