import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { VendorProfile } from '@/components/vendors/vendor-profile'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getVendor(id: string) {
  try {
    const res = await fetch(`${API_URL}/vendors/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
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