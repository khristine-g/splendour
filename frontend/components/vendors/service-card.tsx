// frontend/components/vendors/service-card.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Star, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ServiceCard({ service }: { service: any }) {
  const priceLabel = service.priceType === 'per_person' 
    ? `$${service.price}/person` 
    : `$${service.price.toLocaleString()}`

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-44 w-full">
        <Image src={service.image} alt={service.title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold">{service.title}</h3>
        
        {/* ACCESSING NESTED PRISMA DATA */}
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="relative h-4 w-4 overflow-hidden rounded-full">
            <Image src={service.vendor?.avatar || '/default-avatar.png'} alt="" fill />
          </div>
          <span>{service.vendor?.name}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-sm font-bold">{service.rating}</span>
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