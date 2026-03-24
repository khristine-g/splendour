import Link from 'next/link'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel — decorative */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80"
          alt="Elegant event decoration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative flex h-full flex-col items-start justify-between p-12 text-primary-foreground">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-serif text-2xl font-bold">Splendour Events</span>
          </Link>

          <div>
            <blockquote className="font-serif text-2xl font-semibold leading-snug text-balance">
              &ldquo;The perfect vendor discovery platform — it made planning our wedding an absolute joy.&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              
              <div>
                <p className="font-medium">Amara Johnson</p>
                <p className="text-sm text-primary-foreground/70">Wedding Client, Nairobi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <span className="font-serif text-xl font-bold text-primary">Splendour Events</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-foreground">{title}</h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
