import { Suspense } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { VendorsListing } from '@/components/vendors/vendors-listing'

export const metadata = {
  title: 'Find Vendors — Splendour Events',
  description: 'Browse and compare top-rated event professionals.',
}

function VendorsLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading vendors...</p>
    </div>
  )
}

export default function VendorsPage() {
  return (
    <>
      <Navbar />

      <main>
        <Suspense fallback={<VendorsLoading />}>
          <VendorsListing />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}