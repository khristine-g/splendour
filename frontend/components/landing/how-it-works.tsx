
'use client'

import {
  Search,
  CalendarCheck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

const steps = [
  {
    step: '01',
    eyebrow: 'THE DISCOVERY',
    icon: Search,
    title: 'Find your people.',
    description:
      'Explore a curated collection of event professionals. Compare portfolios, pricing, locations, and reviews to discover the perfect fit for your vision.',
    detail: 'Explore talent',
  },
  {
    step: '02',
    eyebrow: 'THE PLANNING',
    icon: CalendarCheck,
    title: 'Make it official.',
    description:
      'Choose your preferred vendor, share your event details, and submit your booking request. Bringing your celebration to life starts here.',
    detail: 'Plan with confidence',
  },
  {
    step: '03',
    eyebrow: 'THE CELEBRATION',
    icon: Sparkles,
    title: 'Make it memorable.',
    description:
      'Bring your ideas to life with the right professionals by your side. Focus on the people, the atmosphere, and the moments that matter.',
    detail: 'Celebrate beautifully',
  },
]

const palette = {
  ivory: '#F8F3E9',
  cream: '#FFFCF6',
  espresso: '#211A14',
  muted: '#817568',
  gold: '#C7A36A',
  goldLight: '#E3C18A',
  border: '#E8DECE',
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function HowItWorks() {
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
      id="how-it-works"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
      style={{
        backgroundColor: palette.cream,
        color: palette.espresso,
      }}
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(199, 163, 106, 0.09)' }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(227, 193, 138, 0.12)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <motion.div
          {...reveal}
          variants={cardVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span
              className="h-px w-8"
              style={{ backgroundColor: palette.gold }}
            />

            <span
              className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs"
              style={{ color: '#927044' }}
            >
              A little less planning. A lot more magic.
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
            Your celebration,
            <br />

            <span
              className="italic"
              style={{ color: '#A47D47' }}
            >
              beautifully brought together.
            </span>
          </h2>

          <p
            className="mx-auto mt-6 max-w-xl text-sm leading-7 sm:text-base"
            style={{ color: palette.muted }}
          >
            The right people make all the difference. We make finding
            and booking them feel effortless, from your first search
            to the moment everything comes together.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          {...reveal}
          variants={containerVariants}
          className="relative mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[43px] hidden h-px md:block"
            style={{
              backgroundImage: `linear-gradient(to right, ${palette.gold} 45%, transparent 45%)`,
              backgroundSize: '9px 1px',
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.article
                key={step.step}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -6, transition: { duration: 0.25 } }
                }
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 sm:p-9 lg:p-10"
                style={{
                  backgroundColor: palette.ivory,
                  borderColor: palette.border,
                }}
              >
                {/* Large decorative number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-8 select-none font-serif text-[145px] leading-none transition-transform duration-500 group-hover:-translate-y-1 sm:text-[165px]"
                  style={{ color: 'rgba(164, 125, 71, 0.075)' }}
                >
                  {step.step}
                </span>

                {/* Step header */}
                <div className="relative flex items-center justify-between">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: '#927044' }}
                  >
                    {step.eyebrow}
                  </span>

                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-6 group-hover:scale-105"
                    style={{
                      backgroundColor: palette.cream,
                      borderColor: '#DCC7A6',
                      color: '#927044',
                    }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                </div>

                {/* Numbered timeline marker */}
                <div className="relative mt-8 flex items-center">
                  <span
                    className="flex h-[58px] w-[58px] items-center justify-center rounded-full border text-sm font-medium"
                    style={{
                      backgroundColor: palette.cream,
                      borderColor: '#DCC7A6',
                      color: '#927044',
                    }}
                  >
                    {step.step}
                  </span>

                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="ml-3 h-px flex-1 md:hidden"
                      style={{ backgroundColor: '#DCC7A6' }}
                    />
                  )}
                </div>

                {/* Step content */}
                <h3
                  className="relative mt-7 font-serif text-2xl font-medium leading-snug sm:text-3xl"
                  style={{ color: palette.espresso }}
                >
                  {step.title}
                </h3>

                <p
                  className="relative mt-4 flex-1 text-sm leading-7"
                  style={{ color: palette.muted }}
                >
                  {step.description}
                </p>

                {/* Decorative footer */}
                <div
                  className="mt-8 flex items-center justify-between border-t pt-5"
                  style={{ borderColor: palette.border }}
                >
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: '#927044' }}
                  >
                    {step.detail}
                  </span>

                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1"
                    style={{
                      backgroundColor: '#EFE4D2',
                      color: '#76572F',
                    }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          {...reveal}
          variants={cardVariants}
          className="mt-12 flex flex-col items-center gap-3 text-center sm:mt-16"
        >
          <div className="flex items-center gap-2">
            <Sparkles
              className="h-4 w-4"
              style={{ color: palette.gold }}
            />

            <span
              className="font-serif text-lg italic sm:text-xl"
              style={{ color: palette.espresso }}
            >
              Every detail deserves to be special.
            </span>

            <Sparkles
              className="h-4 w-4"
              style={{ color: palette.gold }}
            />
          </div>

          <p
            className="text-xs tracking-wide"
            style={{ color: palette.muted }}
          >
            Start with an idea. Leave the details to your dream team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
