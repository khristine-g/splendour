//app/services/[id]/page.tsx
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ServiceDetail } from '@/components/vendors/service-detail'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

async function getService(id: string) {
  try {
    // Note: Ensure your backend handles GET /api/services/:id
    // and includes the vendor object in the response
    const res = await fetch(`http://localhost:5000/api/services/${id}`, {
      cache: 'no-store' 
    })

    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error("Fetch service error:", error)
    return null
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params
  const service = await getService(id)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Pass the fetched service to your existing ServiceDetail component */}
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </div>
  )
}