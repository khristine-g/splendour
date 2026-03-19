'use client'

import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CreditCard, Shield, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { startCheckoutSession } from '@/app/actions/stripe'
import { PRODUCTS, formatPrice } from '@/lib/products'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function PaymentFlow() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId') || 'photography-basic'
  const [paymentComplete, setPaymentComplete] = useState(false)

  const product = PRODUCTS.find((p) => p.id === productId)

  const fetchClientSecret = useCallback(
    () => startCheckoutSession(productId),
    [productId]
  )

  if (paymentComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="text-center">
          <CardContent className="py-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Payment Successful!</h2>
            <p className="mt-2 text-muted-foreground">
              Your booking has been confirmed. Check your email for details.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground">Complete Your Payment</h1>
        <p className="mt-2 text-muted-foreground">Secure payment powered by Stripe</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product && (
                <>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(product.priceInCents)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Service Fee</span>
                      <span>{formatPrice(Math.round(product.priceInCents * 0.05))}</span>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
                      <span>Total</span>
                      <span className="text-[var(--gold)]">
                        {formatPrice(Math.round(product.priceInCents * 1.05))}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stripe Checkout */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                  fetchClientSecret,
                  onComplete: () => setPaymentComplete(true),
                }}
              >
                <EmbeddedCheckout className="min-h-[500px]" />
              </EmbeddedCheckoutProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
