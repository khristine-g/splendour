//app/client/bookings/page.tsx
'use client'

import { useState } from 'react'
import { Calendar, MapPin, Users, FileText, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Service {
  title: string
  vendorName: string
  price: number
}

interface Props {
  service: Service
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: 'Event Details' },
    { number: 2, label: 'Review' },
    { number: 3, label: 'Confirmation' },
  ]

  return (
    <div className="flex items-center justify-between mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300',
                currentStep > step.number
                  ? 'border-success bg-success text-success-foreground'
                  : currentStep === step.number
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground'
              )}
            >
              {currentStep > step.number ? (
                <Check className="h-5 w-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={cn(
                'mt-2 text-xs font-medium transition-colors hidden sm:block',
                currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'mx-2 sm:mx-4 h-0.5 w-12 sm:w-24 transition-colors duration-300',
                currentStep > step.number ? 'bg-success' : 'bg-border'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function Summary({ service, date, venue, guests }: { service: Service; date: string; venue: string; guests: string }) {
  return (
    <Card className="sticky top-8 overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-primary-foreground">Booking Summary</h2>
      </div>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-foreground">{service.title}</p>
            <p className="text-sm text-muted-foreground">{service.vendorName}</p>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </span>
              <span className="font-medium">{date || '—'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Venue
              </span>
              <span className="font-medium truncate ml-4 max-w-[140px]">{venue || '—'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Guests
              </span>
              <span className="font-medium">{guests || '—'}</span>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Total</span>
              <span className="text-2xl font-bold text-foreground">${service.price.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Final price may vary based on event details</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function BookingForm({ service }: Props) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [guests, setGuests] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <StepIndicator currentStep={step} />

    
        {step === 1 && (
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-foreground">Event Details</h1>
                    <p className="text-muted-foreground mt-1">Fill in the details for your upcoming event</p>
                  </div>

                  <FieldGroup className="gap-5">
                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Event Date
                      </FieldLabel>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-12"
                      />
                      <FieldDescription>When would you like to host your event?</FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        Venue
                      </FieldLabel>
                      <Input
                        type="text"
                        placeholder="Enter venue name or address"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="h-12"
                      />
                      <FieldDescription>The location where the event will be held</FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        Number of Guests
                      </FieldLabel>
                      <Input
                        type="number"
                        placeholder="Expected number of attendees"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="h-12"
                        min={1}
                      />
                      <FieldDescription>Approximate guest count for planning purposes</FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Additional Notes
                      </FieldLabel>
                      <Textarea
                        placeholder="Any special requests, dietary requirements, or additional information..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      <FieldDescription>Share any details that would help us serve you better</FieldDescription>
                    </Field>
                  </FieldGroup>

                  <Button
                    className="w-full mt-8 h-12 text-base"
                    size="lg"
                    onClick={() => setStep(2)}
                  >
                    Continue to Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Summary service={service} date={date} venue={venue} guests={guests} />
            </div>
          </div>
        )}

       
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-foreground">Review Your Booking</h1>
                  <p className="text-muted-foreground mt-1">Please verify all details before confirming</p>
                </div>

                <div className="space-y-6">
                  <div className="rounded-lg border bg-secondary/50 p-5">
                    <h3 className="font-semibold text-foreground mb-4">Service Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium">{service.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provider</span>
                        <span className="font-medium">{service.vendorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-bold text-lg">${service.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-secondary/50 p-5">
                    <h3 className="font-semibold text-foreground mb-4">Event Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Date
                        </span>
                        <span className="font-medium">{date || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> Venue
                        </span>
                        <span className="font-medium">{venue || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Users className="h-4 w-4" /> Guests
                        </span>
                        <span className="font-medium">{guests || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>

                  {notes && (
                    <div className="rounded-lg border bg-secondary/50 p-5">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Additional Notes
                      </h3>
                      <p className="text-muted-foreground text-sm">{notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 h-12"
                    onClick={() => setStep(3)}
                  >
                    Confirm Booking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

     
        {step === 3 && (
          <div className="max-w-lg mx-auto text-center">
            <Card>
              <CardContent className="pt-10 pb-10">
                <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-success flex items-center justify-center">
                    <Check className="h-8 w-8 text-success-foreground" />
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Your booking request has been sent successfully. The vendor will review your request and get back to you shortly.
                </p>

                <div className="rounded-lg border bg-secondary/50 p-5 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    What happens next?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-0.5">•</span>
                      The vendor will review your booking details
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-0.5">•</span>
                      You&apos;ll receive a confirmation email within 24 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success mt-0.5">•</span>
                      A representative may contact you to finalize details
                    </li>
                  </ul>
                </div>

                <Button asChild className="h-12 px-8">
                  <Link href="/">
                    Return Home
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
