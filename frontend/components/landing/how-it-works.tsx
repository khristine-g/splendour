'use client'

import { Search, CalendarCheck, Sparkles } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse & Compare',
    description:
      'Search our curated directory of verified event professionals. Filter by category, price, location, and rating to find your perfect match.',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Book with Confidence',
    description:
      'Select your date, share your vision, and secure your booking in minutes. Our seamless booking flow handles all the details.',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Enjoy Your Event',
    description:
      'Sit back and enjoy. Our vetted professionals arrive prepared to exceed your expectations and create lasting memories.',
  },
]

export function HowItWorks() {

  
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  
  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="how-it-works" className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            How Splendour Works
          </h2>
          <p className="mt-3 text-muted-foreground">
            From discovery to celebration in three simple steps
          </p>
        </motion.div>

   
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.step}
              variants={item}
              className="relative text-center"
            >
             
              {idx < steps.length - 1 && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: false }}
                  className="absolute left-1/2 top-10 hidden h-px -translate-y-1/2 border-t-2 border-dashed border-border md:block"
                  style={{ transformOrigin: 'left' }}
                />
              )}

              <motion.div
                whileHover={{ scale: 1.08 }}
                className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-card shadow-sm"
              >
                <motion.div
                  whileHover={{ rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <step.icon className="h-8 w-8 text-accent" />
                </motion.div>

               
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  viewport={{ once: false }}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                >
                  {step.step}
                </motion.span>
              </motion.div>

             
              <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h3>

             
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}