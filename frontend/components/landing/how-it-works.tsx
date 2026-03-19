import { Search, CalendarCheck, Sparkles } from 'lucide-react'

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
  return (
    <section id="how-it-works" className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl">
            How Splendour Works
          </h2>
          <p className="mt-3 text-muted-foreground">
            From discovery to celebration in three simple steps
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.step} className="relative text-center">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-px w-full -translate-y-1/2 border-t-2 border-dashed border-border md:block" />
              )}

              <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-card shadow-sm">
                <step.icon className="h-8 w-8 text-accent" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>

              <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
