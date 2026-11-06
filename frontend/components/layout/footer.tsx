
import Link from 'next/link'
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  ArrowUpRight,
} from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Find Vendors', href: '/vendors' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Our Journal', href: '/blog' },
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

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: Instagram,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/',
    icon: Twitter,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: Facebook,
  },
]

const palette = {
  espresso: '#211A14',
  deep: '#19130F',
  cream: '#FFFCF6',
  muted: '#B8AA99',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: 'rgba(227, 193, 138, 0.18)',
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: palette.espresso,
        color: palette.cream,
      }}
    >
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(199, 163, 106, 0.09)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Brand statement */}
        <div
          className="grid gap-8 border-b py-12 sm:py-14 md:grid-cols-2 md:items-end"
          style={{ borderColor: palette.border }}
        >
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Sparkles
                className="h-4 w-4"
                style={{ color: palette.goldLight }}
              />

              <span
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: palette.goldLight }}
              >
                The art of celebrating
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Every great moment
              <br />
              begins with the <span className="italic" style={{ color: palette.goldLight }}>right people.</span>
            </h2>
          </div>

          <p
            className="max-w-md text-sm leading-7 md:ml-auto"
            style={{ color: palette.muted }}
          >
            From the first idea to the final detail, Splendour connects
            you with event professionals who help turn meaningful
            occasions into lasting memories.
          </p>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12 sm:py-16 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
          {/* Brand and contact */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Splendour Events home"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-300 group-hover:bg-[#E3C18A]"
                style={{
                  backgroundColor: 'rgba(227, 193, 138, 0.12)',
                  borderColor: 'rgba(227, 193, 138, 0.30)',
                  color: palette.goldLight,
                }}
              >
                <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              </span>

              <span className="font-serif text-2xl font-medium tracking-tight">
                Splendour
                <span
                  className="ml-1.5 text-xs font-normal tracking-[0.15em]"
                  style={{ color: palette.goldLight }}
                >
                  EVENTS
                </span>
              </span>
            </Link>

            <p
              className="mt-5 max-w-sm text-sm leading-7"
              style={{ color: palette.muted }}
            >
              A thoughtful way to discover and book event talent across
              Kenya. Find your people, bring your vision to life, and
              make every celebration count.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
               
<a
  key={label}
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={label}
  className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:border-[#C7A36A] hover:bg-[#E3C18A]/10 hover:text-[#E3C18A]"
  style={{
    borderColor: 'rgba(227, 193, 138, 0.18)',
    color: '#B8AA99',
  }}
>
  <Icon className="h-4 w-4" />
</a>

              ))}
            </div>

            {/* Contact details */}
            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@splendourevents.com"
                className="group flex items-start gap-3 text-sm transition-colors"
                style={{ color: palette.muted }}
              >
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: palette.gold }}
                />

                <span className="transition-colors group-hover:text-[#E3C18A]">
                  hello@splendourevents.com
                </span>
              </a>

              <a
                href="tel:+254728905634"
                className="group flex items-start gap-3 text-sm transition-colors"
                style={{ color: palette.muted }}
              >
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: palette.gold }}
                />

                <span className="transition-colors group-hover:text-[#E3C18A]">
                  +254 728 905 634
                </span>
              </a>

              <div
                className="flex items-start gap-3 text-sm"
                style={{ color: palette.muted }}
              >
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: palette.gold }}
                />

                <span>Kenya</span>
              </div>
            </div>
          </div>

          {/* Navigation groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3
                className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: palette.goldLight }}
              >
                {group}
              </h3>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-[#E3C18A]"
                      style={{ color: palette.muted }}
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col gap-5 border-t py-7 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: palette.border }}
        >
          <p
            className="text-xs leading-6"
            style={{ color: '#A99A88' }}
          >
            © {new Date().getFullYear()} Splendour Events. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="text-xs transition-colors hover:text-[#E3C18A]"
              style={{ color: '#A99A88' }}
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs transition-colors hover:text-[#E3C18A]"
              style={{ color: '#A99A88' }}
            >
              Terms
            </Link>

            <span
              className="hidden h-3 w-px sm:block"
              style={{ backgroundColor: palette.border }}
            />

            <p
              className="flex items-center gap-1.5 text-xs"
              style={{ color: '#A99A88' }}
            >
              Made with
              <span style={{ color: palette.goldLight }}>♥</span>
              in Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
