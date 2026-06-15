// app/services/[id]/page.tsx
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ServiceDetail } from '@/components/vendors/service-detail'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getService(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/services/${id}`, {
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
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </div>
  )
}