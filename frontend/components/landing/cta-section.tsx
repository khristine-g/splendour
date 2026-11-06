
'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Store,
  Sparkles,
  Check,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

const palette = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: '#E8DECE',
}

const benefits = [
  'A dedicated space to showcase your services',
  'Tools to manage your booking requests',
  'Connect with clients looking for your expertise',
  'Build your presence in the event industry',
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

export function CtaSection() {
  const reduceMotion = useReducedMotion()

  const reveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.15 },
      }

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
      style={{
        backgroundColor: palette.ivory,
        color: palette.espresso,
      }}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(199, 163, 106, 0.10)' }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(227, 193, 138, 0.13)' }}
      />

      <motion.div
        {...reveal}
        variants={containerVariants}
        className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"
      >
        {/* Intro */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span
              className="h-px w-8"
              style={{ backgroundColor: palette.gold }}
            />

            <span
              className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs"
              style={{ color: '#927044' }}
            >
              Your next chapter starts here
            </span>

            <span
              className="h-px w-8"
              style={{ backgroundColor: palette.gold }}
            />
          </div>

          <h2
            className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: palette.espresso }}
          >
            Big celebrations.
            <br />

            <span
              className="italic"
              style={{ color: '#A47D47' }}
            >
              Brilliant possibilities.
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base"
            style={{ color: palette.muted }}
          >
            Whether you&apos;re bringing a vision to life or building
            your business, there&apos;s a place for you at Splendour.
          </p>
        </motion.div>

        {/* Two audience panels */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Event planner panel */}
          <motion.div
            variants={itemVariants}
            whileHover={
              reduceMotion ? undefined : { y: -5 }
            }
            className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] border p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#5A4020]/5 sm:p-10 lg:p-12"
            style={{
              backgroundColor: palette.cream,
              borderColor: palette.border,
            }}
          >
            {/* Decorative watermark */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-10 select-none font-serif text-[190px] italic leading-none"
              style={{ color: 'rgba(164, 125, 71, 0.07)' }}
            >
              S
            </div>

            <div className="relative flex items-center justify-between">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: '#927044' }}
              >
                For the visionaries
              </span>

              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border"
                style={{
                  borderColor: '#DCC7A6',
                  color: '#927044',
                  backgroundColor: '#F7EEDF',
                }}
              >
                <Sparkles className="h-5 w-5" strokeWidth={1.6} />
              </span>
            </div>

            <div className="relative mt-9 flex-1">
              <h3
                className="max-w-md font-serif text-3xl font-medium leading-tight sm:text-4xl"
                style={{ color: palette.espresso }}
              >
                Your dream event
                <br />
                deserves its dream team.
              </h3>

              <p
                className="mt-5 max-w-md text-sm leading-7 sm:text-base"
                style={{ color: palette.muted }}
              >
                From intimate celebrations to unforgettable occasions,
                discover talented professionals who can bring your ideas
                to life.
              </p>
            </div>

            <div className="relative mt-9">
              <Link
                href="/vendors"
                className="group/button inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: palette.espresso,
                  color: palette.cream,
                }}
              >
                Find your vendors

                <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <p
                className="mt-4 text-[11px] tracking-wide"
                style={{ color: '#9A8B78' }}
              >
                Discover. Compare. Celebrate.
              </p>
            </div>
          </motion.div>

          {/* Vendor panel */}
          <motion.div
            variants={itemVariants}
            whileHover={
              reduceMotion ? undefined : { y: -5 }
            }
            className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] border p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#5A4020]/10 sm:p-10 lg:p-12"
            style={{
              backgroundColor: palette.espresso,
              borderColor: '#382B20',
              color: palette.cream,
            }}
          >
            {/* Decorative gold glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(227, 193, 138, 0.12)' }}
            />

            {/* Fine decorative lines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-20 right-8 h-40 w-40 rounded-full border sm:right-12"
              style={{ borderColor: 'rgba(227, 193, 138, 0.10)' }}
            />

            <div className="relative flex items-center justify-between">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: palette.goldLight }}
              >
                For the creators
              </span>

              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border"
                style={{
                  borderColor: 'rgba(227, 193, 138, 0.35)',
                  backgroundColor: 'rgba(227, 193, 138, 0.10)',
                  color: palette.goldLight,
                }}
              >
                <Store className="h-5 w-5" strokeWidth={1.6} />
              </span>
            </div>

            <div className="relative mt-9 flex-1">
              <h3 className="max-w-md font-serif text-3xl font-medium leading-tight sm:text-4xl">
                Your talent.
                <br />

                <span
                  className="italic"
                  style={{ color: palette.goldLight }}
                >
                  A bigger stage.
                </span>
              </h3>

              <p
                className="mt-5 max-w-md text-sm leading-7 sm:text-base"
                style={{ color: '#C7BCAF' }}
              >
                Put your work in front of people planning their next
                celebration and give your event business room to grow.
              </p>

              <ul className="mt-6 space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm leading-6"
                    style={{ color: '#E2D8CA' }}
                  >
                    <span
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: 'rgba(227, 193, 138, 0.14)',
                        color: palette.goldLight,
                      }}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>

                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-9">
              <Link
                href="/auth/register?role=vendor"
                className="group/button inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: palette.goldLight,
                  color: palette.espresso,
                }}
              >
                Join as a vendor

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
              </Link>

              <p
                className="mt-4 text-[11px] tracking-wide"
                style={{ color: '#B8A997' }}
              >
                Showcase your craft. Grow your reach.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Closing detail */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center gap-3 text-center"
        >
          <div
            className="h-px w-14"
            style={{ backgroundColor: palette.gold }}
          />

          <p
            className="font-serif text-lg italic sm:text-xl"
            style={{ color: '#927044' }}
          >
            Something beautiful begins with the right people.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
