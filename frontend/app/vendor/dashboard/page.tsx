'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { AddServiceModal } from '@/components/dashboard/add-service-modal'
import { PortfolioManager } from '@/components/dashboard/portfolio-manager'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Users, Star, Package, Loader2, Trash2, AlertCircle } from 'lucide-react'
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

  // 1. Role Security: Redirect if not a Vendor
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'VENDOR')) {
      router.push('/auth/login')
      toast.error("Unauthorized access.")
    }
  }, [user, authLoading, router])

  // 2. Fetch function with Guard Clause to prevent 404/500 errors
  const fetchVendorDetails = useCallback(async () => {
    // GUARD: Do not fetch if we don't have a vendorId yet
    if (!vendorId) return

    try {
      const response = await fetch(`http://localhost:5000/api/vendors/${vendorId}`)
      
      // Handle "Not Found" gracefully without crashing the app
      if (response.status === 404) {
        console.warn("Vendor profile not found in DB")
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
    fetchVendorDetails()
  }, [fetchVendorDetails])

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
      console.error("Delete error:", error)
    }
  }

  // Placeholder stats - You can later fetch these from a /api/vendors/stats endpoint
  const stats = [
    { label: 'Total Earnings', value: 'KSh 0', icon: DollarSign, color: 'text-green-600' },
    { label: 'Pending Bookings', value: 'Check Bookings Tab', icon: Users, color: 'text-blue-600' },
    { label: 'Platform Rating', value: '4.9', icon: Star, color: 'text-orange-500' },
  ]

  if (authLoading || (loading && !vendorData)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <DashboardShell userType="vendor" userName={vendorData?.name || user?.name || "Vendor Admin"}>
      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        
        {/* Left Column: Management */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Service Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendorId && (
                <AddServiceModal 
                  vendorId={vendorId} 
                  onSuccess={fetchVendorDetails} 
                />
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
          <Card className="border-none shadow-sm h-full">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Active Listings
                </CardTitle>
                <Badge variant="secondary" className="rounded-full px-3">
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
                      className="group flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/20 transition-all shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-foreground truncate">{service.title}</h4>
                          <Badge variant="outline" className="text-[9px] h-4 uppercase px-1">
                            {service.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                          {service.description || 'No description.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="font-black text-primary text-sm block">
                            KSh {service.price.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">
                            {service.priceType.replace('_', ' ')}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteService(service.id)}
                          className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-secondary/5">
                  <Package className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-sm font-semibold text-foreground">No services listed yet</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto text-balance">
                    List your photography or decor packages to start receiving bookings.
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