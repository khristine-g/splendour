
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Star,
  ArrowRight,
  Camera,
  ChefHat,
  Flower2,
  Music2,
  Mic2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const categories = [
  { label: 'Photography', icon: Camera, search: 'Photography' },
  { label: 'Catering', icon: ChefHat, search: 'Catering' },
  { label: 'Decoration', icon: Flower2, search: 'Decoration' },
  { label: 'DJs', icon: Music2, search: 'DJ' },
  { label: 'MCs', icon: Mic2, search: 'MC' },
]

const stats = [
  { value: '142+', label: 'Verified Vendors' },
  { value: '1,847', label: 'Events Completed' },
  { value: '3,291', label: 'Happy Clients' },
]

export function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  }

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const value = query.trim()

    router.push(
      value
        ? `/vendors?search=${encodeURIComponent(value)}`
        : '/vendors'
    )
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#17130F] text-[#F8F3E9]">

      {/* Background photography */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=2000&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Layered dark overlays */}
      <div className="absolute inset-0 -z-10 bg-[#17130F]/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#17130F] via-[#17130F]/90 to-[#17130F]/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17130F] via-transparent to-black/30" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-[#C5A16A]/10 blur-[120px]" />

    

      {/* Main hero */}
      <motion.div
        variants={stagger}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-14 lg:pb-24 lg:pt-28"
      >

        {/* Left content */}
        <div className="relative z-10 max-w-[760px]">

          <motion.div
            variants={fadeUp}
            className="mb-7 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[#E3C18A] sm:text-xs"
          >
            <span className="h-px w-9 bg-[#E3C18A]" />
            Plan. Book. Celebrate.
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-[clamp(3.5rem,7.2vw,6.8rem)] font-normal leading-[0.96] tracking-[-0.065em]"
          >
            Your Perfect
            <br />
            Event Starts
            <br />
            <span className="italic text-[#E3C18A]">
              Here.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[490px] text-sm leading-7 text-white/70 sm:text-base sm:leading-8"
          >
            Discover and book Kenya&apos;s finest photographers,
            caterers, decorators, DJs, MCs and more.
            Everything you need to celebrate, beautifully.
          </motion.p>

          {/* Search */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSearch}
            className="mt-9 flex w-full max-w-[590px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] p-2 pl-4 shadow-2xl shadow-black/20 backdrop-blur-xl transition-colors focus-within:border-[#E3C18A]/60 sm:pl-5"
          >
            <Search className="h-5 w-5 shrink-0 text-[#E3C18A]" />

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Photographers, caterers, DJs..."
              aria-label="Search event vendors"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/45"
            />

            <button
              type="submit"
              aria-label="Search vendors"
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#E3C18A] px-4 text-sm font-semibold text-[#21180F] transition-all duration-300 hover:bg-[#F2D7A7] sm:px-6"
            >
              <span className="hidden sm:inline">Search</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Category shortcuts */}
          <motion.div variants={fadeUp} className="mt-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-white/40">
              Explore by category
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-7">
              {categories.map(({ label, icon: Icon, search }) => (
                <Link
                  key={label}
                  href={`/vendors?search=${encodeURIComponent(search)}`}
                  className="group flex items-center gap-2 text-xs text-white/70 transition-colors hover:text-[#E3C18A]"
                >
                  <Icon className="h-4 w-4 text-[#E3C18A]/80 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Main calls to action */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/booking"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#E3C18A] px-7 text-sm font-semibold text-[#21180F] transition-all duration-300 hover:bg-[#F2D7A7]"
            >
              Book Your Event
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/vendors"
              className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              Browse all vendors
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right editorial image */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[510px] lg:ml-auto lg:mt-4"
        >
          <div className="relative aspect-[4/5] max-h-[590px] overflow-hidden rounded-t-[48%] rounded-b-2xl border border-white/15 shadow-2xl shadow-black/40">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1100&q=85"
              alt="An elegant wedding celebration with thoughtfully styled details"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover transition-transform duration-[1500ms] hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/90 via-transparent to-black/10" />

            <div className="absolute left-5 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur-md sm:left-7 sm:top-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E3C18A]" />
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/90">
                The art of celebrating
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <p className="font-serif text-3xl leading-tight sm:text-4xl">
                Every detail.
                <br />
                <span className="italic text-[#E3C18A]">
                  A little extraordinary.
                </span>
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/25 pt-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">
                    Your next chapter
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    Starts with Splendour.
                  </p>
                </div>

                <Link
                  href="/vendors"
                  aria-label="Explore our vendors"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-[#E3C18A] transition-all duration-300 hover:border-[#E3C18A] hover:bg-[#E3C18A] hover:text-[#21180F]"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating trust card */}
          <div className="absolute -bottom-5 -left-2 max-w-[225px] rounded-2xl border border-white/15 bg-[#211C17]/95 p-4 shadow-2xl backdrop-blur-xl sm:-left-10 sm:bottom-12 sm:p-5">
            <div className="flex items-center gap-2 text-[#E3C18A]">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[9px] uppercase tracking-[0.15em]">
                Quality, considered
              </span>
            </div>

            <p className="mt-2 font-serif text-xl">
              The right people.
            </p>

            <p className="mt-1 text-xs leading-5 text-white/55">
              Find the professionals who bring your vision to life.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Statistics */}
      <div className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-14">
        <div className="grid grid-cols-3 border-t border-white/15 py-7">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-white/10 px-2 text-center last:border-r-0 sm:px-6"
            >
              <p className="font-serif text-xl text-[#E3C18A] sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[9px] leading-4 text-white/55 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#E3C18A]/60 to-transparent" />
    </section>
  )
}
