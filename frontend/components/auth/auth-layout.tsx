
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
    <div className="min-h-screen bg-[#F8F5F0] p-3 sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[1440px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_80px_-30px_rgba(57,43,39,0.18)] lg:grid-cols-2">

        {/* Left panel — single event image */}
        <div className="relative hidden min-h-[700px] overflow-hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
            alt="Elegant wedding celebration"
            fill
            priority
            sizes="(max-width: 1024px) 0px, 50vw"
            className="object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#251915]/85 via-[#251915]/20 to-[#251915]/20" />

          {/* Brand */}
          <div className="absolute left-8 top-8 z-10 xl:left-10 xl:top-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9B78D]">
                <Sparkles className="h-5 w-5 text-[#392B27]" />
              </div>

              <span className="font-serif text-2xl font-bold text-white">
                Splendour<span className="text-[#D9B78D]">.</span>
              </span>
            </Link>
          </div>

          {/* Image content */}
          <div className="absolute bottom-10 left-8 right-8 z-10 xl:bottom-14 xl:left-10 xl:right-10">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-px w-8 bg-[#D9B78D]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E7CBA9]">
                Celebrations, beautifully connected
              </span>
            </div>

            <h2 className="max-w-lg font-serif text-4xl leading-[1.12] text-white xl:text-5xl">
              Every special moment deserves a little splendour.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              Discover talented event professionals and bring
              your celebration to life, beautifully and effortlessly.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-1 w-10 rounded-full bg-[#D9B78D]" />
              <div className="h-1 w-5 rounded-full bg-white/40" />
              <div className="h-1 w-5 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        {/* Right panel — authentication content */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-[480px]">

            {/* Mobile brand */}
            <div className="mb-10 text-center lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#984653]">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>

                <span className="font-serif text-2xl font-bold text-[#392B27]">
                  Splendour<span className="text-[#984653]">.</span>
                </span>
              </Link>
            </div>

            {/* Page heading */}
            <div className="mb-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#984653]">
                Your celebration starts here
              </p>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#392B27] sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#85776E]">
                {subtitle}
              </p>
            </div>

            {/* Login or registration form */}
            {children}

            {/* Footer */}
            <p className="mt-10 text-center text-[11px] text-[#B0A49A]">
              Making every celebration a little more special.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

