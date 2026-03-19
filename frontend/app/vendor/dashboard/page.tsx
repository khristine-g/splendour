'use client'

import { useState, useEffect, useCallback } from 'react'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { AddServiceModal } from '@/components/dashboard/add-service-modal'
import { PortfolioManager } from '@/components/dashboard/portfolio-manager'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Users, Star, Package, Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner' // Optional: if you use sonner for notifications

interface Service {
  id: string
  title: string      // Matches Prisma Schema
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
  // Replace this with your actual logged-in vendor UUID from your DB
  const vendorId = "54188a94-37fa-4674-8433-971984395df0" 
  
  const [vendorData, setVendorData] = useState<VendorData | null>(null)
  const [loading, setLoading] = useState(true)

  // 1. Fetch function wrapped in useCallback to prevent infinite loops
  const fetchVendorDetails = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/vendors/${vendorId}`)
      if (!response.ok) throw new Error('Failed to fetch vendor data')
      
      const data = await response.json()
      setVendorData(data)
    } catch (error) {
      console.error("Dashboard Load Error:", error)
    } finally {
      setLoading(false)
    }
  }, [vendorId])

  useEffect(() => {
    fetchVendorDetails()
  }, [fetchVendorDetails])

  // 2. Handle Service Deletion
  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Are you sure you want to remove this service?")) return

    try {
      const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchVendorDetails() // Refresh list
      } else {
        alert("Failed to delete service. Make sure the backend route exists.")
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const stats = [
    { label: 'Total Earnings', value: '$4,250', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Bookings', value: '12', icon: Users, color: 'text-blue-600' },
    { label: 'Platform Rating', value: '4.9', icon: Star, color: 'text-accent' },
  ]

  return (
    <DashboardShell userType="vendor" userName={vendorData?.name || "Vendor Admin"}>
      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        
        {/* Management Tools Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Service Modal Component */}
              <AddServiceModal 
                vendorId={vendorId} 
                onSuccess={fetchVendorDetails} 
              />
            </CardContent>
          </Card>

          {/* Portfolio Management Component */}
          <PortfolioManager 
            vendorId={vendorId} 
            initialImages={vendorData?.portfolio || []} 
            onUpdate={fetchVendorDetails} 
          />
        </div>
        
        {/* Current Listings Column */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-sm h-full">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Active Listings
                </CardTitle>
                <Badge variant="secondary" className="rounded-full px-3">
                  {vendorData?.services?.length || 0} Published
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : vendorData?.services && vendorData.services.length > 0 ? (
                <div className="space-y-4">
                  {vendorData.services.map((service) => (
                    <div 
                      key={service.id} 
                      className="group flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-accent/50 transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-foreground truncate">{service.title}</h4>
                          <Badge variant="outline" className="text-[10px] h-4 uppercase px-1.5">
                            {service.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                          {service.description || 'No description provided.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="font-black text-primary text-sm block">
                            ${service.price.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase font-medium">
                            {service.priceType.replace('_', ' ')}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteService(service.id)}
                          className="text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
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
                  <h3 className="text-sm font-semibold text-foreground">No services listed</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get started by adding your first service package.
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