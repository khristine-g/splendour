// frontend/app/vendors/[id]/page.tsx
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { VendorProfile } from '@/components/vendors/vendor-profile'
import { notFound } from 'next/navigation'

async function getVendor(id: string) {
  try {
    // CHANGE: Added { cache: 'no-store' } to ensure you get the LATEST services/portfolio
    const res = await fetch(`http://localhost:5000/api/vendors/${id}`, { 
      cache: 'no-store' 
    })

    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export default async function VendorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vendor = await getVendor(id)

  if (!vendor) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <VendorProfile vendor={vendor} />
      </main>
      <Footer />
    </div>
  )
}