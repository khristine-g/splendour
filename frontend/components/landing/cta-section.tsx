import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Store } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-balance sm:text-4xl">
              Planning an event?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
              Browse hundreds of verified professionals and book your dream team in minutes.
            </p>
            <Button
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              asChild
            >
              <Link href="/vendors">
                Find Vendors <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <Store className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Are you a vendor?</h3>
            </div>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed">
              Join Africa&apos;s fastest-growing event marketplace. Get discovered by thousands of
              clients, manage your bookings, and grow your business — all in one platform.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/70">
              {[
                'Free to join — no upfront costs',
                'Smart booking management tools',
                'Secure payment processing',
                'Verified vendor badge',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="mt-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/auth/register?role=vendor">Become a Vendor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
