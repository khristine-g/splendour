import Link from 'next/link'
import { Sparkles, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Find Vendors', href: '/vendors' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  'For Vendors': [
    { label: 'Become a Vendor', href: '/auth/register?role=vendor' },
    { label: 'Vendor Dashboard', href: '/vendor/dashboard' },
    { label: 'Vendor Resources', href: '/resources' },
    { label: 'Success Stories', href: '/stories' },
  ],
  Support: [
    { label: 'Help Centre', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
        
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="font-serif text-xl font-bold">Splendour Events</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              The premier marketplace connecting clients with Kenya&apos;s finest event professionals. Creating unforgettable experiences, one event at a time.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-primary-foreground/60 transition-colors hover:text-accent">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-primary-foreground/60 transition-colors hover:text-accent">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-primary-foreground/60 transition-colors hover:text-accent">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6 space-y-2 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@splendourevents.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+254 728905634 SPLENDOUR</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Kenya</span>
              </div>
            </div>
          </div>

        
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-sm text-primary-foreground/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Splendour Events. All rights reserved.</p>
          <p>Built with care in Kenya, for the Kenya.</p>
        </div>
      </div>
    </footer>
  )
}
