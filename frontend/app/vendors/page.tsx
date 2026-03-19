import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { VendorsListing } from '@/components/vendors/vendors-listing'

export const metadata = {
  title: 'Find Vendors — Splendour Events',
  description: 'Browse and compare top-rated event professionals.',
}

export default function VendorsPage() {
  return (
    <>
      <Navbar />
      <main>
        <VendorsListing />
      </main>
      <Footer />
    </>
  )
}
