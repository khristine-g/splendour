'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'


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

export function VendorCard({ vendor }: VendorCardProps) {
 
  if (!vendor) return null

  return (
    <Card className="group overflow-hidden border-border transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={vendor.coverImage || '/placeholder-cover.jpg'}
          alt={vendor.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {vendor.featured && (
          <div className="absolute left-3 top-3">
            <Badge className="bg-accent text-accent-foreground text-[10px] font-bold uppercase">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-background shadow-sm -mt-8 z-10 bg-muted">
            <Image
              src={vendor.avatar || '/placeholder-avatar.png'}
              alt={vendor.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="flex items-center gap-1">
              <h3 className="truncate font-bold text-foreground tracking-tight">{vendor.name}</h3>
              {vendor.verified && (
                <CheckCircle className="h-4 w-4 shrink-0 text-blue-500" />
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{vendor.location}</span>
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed min-h-[2.5rem]">
          {vendor.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-sm font-bold">{vendor.rating?.toFixed(1)}</span>
            <span className="text-[10px] text-muted-foreground uppercase">({vendor.reviewCount})</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground uppercase block">From</span>
            <p className="text-sm font-black text-primary">
              ${vendor.startingPrice?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Button className="w-full font-semibold" size="sm" asChild>
            <Link href={`/vendors/${vendor.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}