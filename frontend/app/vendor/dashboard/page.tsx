'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { AddVendorModal } from '@/components/dashboard/add-vendor-modal'
import { PortfolioManager } from '@/components/dashboard/portfolio-manager'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Users, Star, Package, Loader2, Trash2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context' 
import { toast } from 'sonner'

interface Service {
  id: string
  title: string
  description: string
  price: number
  category: string
  priceType: string
}

interface VendorData {
  id: string
  name: string
  portfolio: string[]
  services: Service[]
}

export default function VendorDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const vendorId = user?.id 
  
  const [vendorData, setVendorData] = useState<VendorData | null>(null)
  const [loading, setLoading] = useState(true)

  // 1. Role Security
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'VENDOR')) {
      router.push('/auth/login')
      toast.error("Unauthorized access.")
    }
  }, [user, authLoading, router])

  // 2. Fetch function
  const fetchVendorDetails = useCallback(async () => {
    if (!vendorId) return

    try {
      const response = await fetch(`http://localhost:5000/api/vendors/${vendorId}`)
      
      if (response.status === 404) {
        setLoading(false)
        return
      }

      if (!response.ok) throw new Error('Failed to fetch vendor data')
      
      const data = await response.json()
      setVendorData(data)
    } catch (error) {
      console.error("Dashboard Load Error:", error)
      toast.error("Could not sync with server")
    } finally {
      setLoading(false)
    }
  }, [vendorId])

  useEffect(() => {
    if (vendorId) fetchVendorDetails()
  }, [vendorId, fetchVendorDetails])

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Are you sure you want to remove this service?")) return

    try {
      const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success("Service removed")
        fetchVendorDetails() 
      }
    } catch (error) {
      toast.error("Failed to delete service")
    }
  }

  const stats = [
    { label: 'Total Earnings', value: 'KSh 0', icon: DollarSign, color: 'text-green-600' },
    { label: 'Pending Bookings', value: '0', icon: Users, color: 'text-blue-600' },
    { label: 'Platform Rating', value: '4.9', icon: Star, color: 'text-orange-500' },
  ]

  if (authLoading || (loading && !vendorData)) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <DashboardShell userType="vendor" userName={vendorData?.name || user?.name || "Vendor Admin"}>
      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tight text-slate-800">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        
        {/* Left Column: Management */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-serif font-bold italic">Add New Service</CardTitle>
              <p className="text-xs text-muted-foreground">List a new package for clients to book.</p>
            </CardHeader>
            <CardContent>
              {/* FIXED: Passing vendorId and onSuccess correctly */}
              {vendorId ? (
                <AddVendorModal 
                  vendorId={vendorId} 
                  onSuccess={fetchVendorDetails} 
                />
              ) : (
                <div className="p-4 bg-slate-50 rounded-lg text-xs italic text-slate-400">
                  Loading vendor profile...
                </div>
              )}
            </CardContent>
          </Card>

          <PortfolioManager 
            vendorId={vendorId || ""} 
            initialImages={vendorData?.portfolio || []} 
            onUpdate={fetchVendorDetails} 
          />
        </div>
        
        {/* Right Column: Listings */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-sm h-full bg-white">
            <CardHeader className="border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-xl font-bold italic flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Active Listings
                </CardTitle>
                <Badge variant="secondary" className="rounded-full px-3 text-[10px] uppercase font-bold">
                  {vendorData?.services?.length || 0} Packages
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {vendorData?.services && vendorData.services.length > 0 ? (
                <div className="space-y-4">
                  {vendorData.services.map((service) => (
                    <div 
                      key={service.id} 
                      className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-primary/20 transition-all shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-slate-800 truncate">{service.title}</h4>
                          <Badge variant="outline" className="text-[9px] h-4 uppercase px-1 bg-white">
                            {service.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 max-w-[300px]">
                          {service.description || 'No description provided.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="font-black text-primary text-sm block">
                            KSh {service.price.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
                            {service.priceType.replace('_', ' ')}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteService(service.id)}
                          className="text-slate-300 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                  <Package className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-sm font-semibold text-slate-900">No services listed yet</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                    List your first package to start appearing in search results.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardShell>
  )
}