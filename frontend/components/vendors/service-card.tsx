// frontend/components/vendors/service-card.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ServiceCard({ service }: { service: any }) {
  // Use a fallback for vendor data to prevent red lines/crashes
  const vendorName = service.vendor?.name || "Service Provider"
  const vendorAvatar = service.vendor?.avatar || "/placeholder-avatar.png"

  const priceLabel = service.priceType === 'per_person' 
    ? `$${service.price}/person` 
    : `$${(service.price || 0).toLocaleString()}`

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md border-border">
      <div className="relative h-44 w-full bg-muted">
        <Image 
          src={service.image || '/placeholder-service.jpg'} 
          alt={service.title} 
          fill 
          className="object-cover" 
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{service.title}</h3>
        
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="relative h-5 w-5 overflow-hidden rounded-full border">
            <Image src={vendorAvatar} alt={vendorName} fill className="object-cover" />
          </div>
          <span className="font-medium">{vendorName}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-sm font-bold">{service.rating || 'New'}</span>
          </div>
          <span className="text-sm font-bold text-primary">{priceLabel}</span>
        </div>

        <Button size="sm" className="mt-4 w-full" asChild>
          <Link href={`/services/${service.id}`}>
            View Details <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}