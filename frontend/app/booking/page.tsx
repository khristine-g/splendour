
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { BookingForm } from '@/components/booking/booking-form'
import { Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

function BookingPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const serviceId = searchParams.get('serviceId')

  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!serviceId) {
      setError('No service was selected.')
      setLoading(false)
      return
    }

    const fetchService = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/services/${serviceId}`
        )

        if (!response.ok) {
          throw new Error('Unable to load this service.')
        }

        const data = await response.json()
        setService(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Something went wrong.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [serviceId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F3E9]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C7A36A]" />
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F3E9] px-4 text-center">
        <h1 className="text-2xl font-semibold text-[#211A14]">
          Unable to load booking
        </h1>
        <p className="mt-2 text-[#817568]">
          {error || 'The selected service could not be found.'}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 rounded-full bg-[#211A14] px-6 py-3 text-white"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <BookingForm
      service={{
        ...service,
        vendorName: service.vendor?.name || 'Service Provider',
      }}
    />
  )
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  )
}
