// frontend/app/vendors/[id]/page.tsx
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { VendorProfile } from '@/components/vendors/vendor-profile'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

// Helper to fetch vendor data from your Express API
async function getVendor(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/vendors/${id}`, {
      // Revalidate every hour, or use { cache: 'no-store' } for real-time
      next: { revalidate: 3600 } 
    })

    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export default async function VendorProfilePage({ params }: Props) {
  // 1. Await the params promise (Next.js 15 requirement)
  const { id } = await params

  // 2. Fetch the actual vendor from the database
  const vendor = await getVendor(id)

  // 3. Handle 404 if vendor doesn't exist in DB
  if (!vendor) {
    notFound()
  }

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