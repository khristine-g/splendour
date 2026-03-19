import { Suspense } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PaymentFlow } from '@/components/payments/payment-flow'
import { Spinner } from '@/components/ui/spinner'

export const metadata = {
  title: 'Complete Payment - Splendour Events',
  description: 'Secure payment for your event booking',
}

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary/30">
        <Suspense fallback={
          <div className="flex items-center justify-center py-24">
            <Spinner className="h-8 w-8" />
          </div>
        }>
          <PaymentFlow />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
