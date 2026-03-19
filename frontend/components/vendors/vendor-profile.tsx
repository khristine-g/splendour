//components/vendors/vendor-profile.tsx
'use client'

import Image from 'next/image'
import { MapPin, CheckCircle, Star, Award } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ServiceCard } from './service-card'
import { BookingSection } from './booking-section' // Import the booking component

export function VendorProfile({ vendor }: { vendor: any }) {
  // TODO: Replace this with your actual logged-in user ID from your Auth context
  const currentUserId = "user_2pX..." 

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      {/* Header / Cover Image */}
      <div className="relative h-64 w-full lg:h-96">
        <Image 
          src={vendor.coverImage || '/placeholder-cover.jpg'} 
          alt={`${vendor.name} cover`} 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Info Bar */}
        <div className="-mt-20 relative z-10 flex flex-col items-start gap-6 rounded-2xl bg-card p-8 shadow-xl border border-border lg:flex-row lg:items-center">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-card shadow-lg bg-muted">
            <Image src={vendor.avatar || '/placeholder-avatar.png'} alt={vendor.name} fill className="object-cover" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-serif font-bold tracking-tight">{vendor.name}</h1>
              {vendor.verified && <CheckCircle className="h-5 w-5 text-blue-500 fill-blue-50" />}
            </div>
            <p className="text-lg text-muted-foreground mt-1 italic">{vendor.tagline}</p>
            
            <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {vendor.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-accent text-accent" /> 
                <span className="font-bold">{vendor.rating}</span> 
                <span className="text-muted-foreground">({vendor.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Award className="h-4 w-4 text-primary" /> {vendor.completedEvents || 0} Successful Events
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          
          {/* Left Column: Details & Tabs (2/3 width) */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start gap-10">
                <TabsTrigger 
                  value="services" 
                  className="rounded-none py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-sm uppercase tracking-widest"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger 
                  value="portfolio" 
                  className="rounded-none py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-sm uppercase tracking-widest"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className="rounded-none py-4 px-1 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-sm uppercase tracking-widest"
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="py-8 animate-in fade-in duration-500">
                <div className="grid gap-6 sm:grid-cols-2">
                  {vendor.services?.length > 0 ? (
                    vendor.services.map((service: any) => (
                      <ServiceCard key={service.id} service={{...service, vendor}} />
                    ))
                  ) : (
                    <p className="text-muted-foreground italic col-span-2 text-center py-10 border rounded-xl border-dashed">
                      No services listed yet.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="py-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {vendor.portfolio?.length > 0 ? (
                    vendor.portfolio.map((img: string, i: number) => (
                      <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
                        <Image 
                          src={img} 
                          alt={`Portfolio ${i}`} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground italic col-span-3 text-center py-10 border rounded-xl border-dashed">
                      No portfolio images uploaded.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="about" className="py-8 animate-in fade-in duration-500">
                <div className="prose prose-slate max-w-none">
                  <h3 className="font-serif text-2xl font-bold mb-4">Our Story</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {vendor.description || "No description provided for this vendor."}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Booking Widget (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingSection vendor={vendor} clientId={currentUserId} />
              
              {/* Optional: Trusted Badge / Small Info */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase">Secure Booking</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Your funds are protected by Splendour Escrow.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}