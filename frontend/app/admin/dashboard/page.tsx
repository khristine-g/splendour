//app/admin/dashboard/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, Store, Calendar, DollarSign, 
  Activity, RefreshCw, UserPlus, PackagePlus, Trash2, XCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { AddServiceModal } from '@/components/dashboard/add-service-modal'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({ users: 0, vendors: 0, bookings: 0, revenue: 0 })
  const [activity, setActivity] = useState<any>({ bookings: [], users: [] })
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchData = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const [statsRes, activityRes, vendorsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats'),
        fetch('http://localhost:5000/api/admin/activity'),
        fetch('http://localhost:5000/api/vendors')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (activityRes.ok) setActivity(await activityRes.json());
      if (vendorsRes.ok) setVendors(await vendorsRes.json());
    } catch (err) {
      toast.error("Failed to sync platform data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const handleDeleteVendor = async (id: string, name: string) => {
    if (!confirm(`Permanently remove ${name}? This deletes all their services and bookings.`)) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/vendors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Vendor deleted");
        fetchData();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleDeleteService = async (serviceId: string, serviceTitle: string) => {
    if (!confirm(`Delete the service "${serviceTitle}"?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Service removed");
        fetchData(); // Refresh list
      }
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center font-serif italic text-slate-500">
      <RefreshCw className="w-8 h-8 animate-spin mb-4 text-primary" />
      Syncing Command Center...
    </div>
  )

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold italic text-slate-900">Admin Overview</h1>
          <p className="text-slate-500 text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Platform Monitor
          </p>
        </div>
        <Button onClick={fetchData} variant="outline" disabled={isRefreshing} className="bg-white">
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStat title="Total Revenue" value={`KSh ${stats.revenue.toLocaleString()}`} icon={<DollarSign className="text-green-600" />} />
        <QuickStat title="Total Users" value={stats.users} icon={<Users className="text-blue-600" />} />
        <QuickStat title="Total Vendors" value={stats.vendors} icon={<Store className="text-purple-600" />} />
        <QuickStat title="Bookings" value={stats.bookings} icon={<Calendar className="text-orange-600" />} />
      </div>

      {/* Inventory Management */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-slate-400">
            <PackagePlus className="w-5 h-5" />
            <h2 className="text-xl font-serif font-bold italic text-slate-800">Inventory Management</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="border-none shadow-sm bg-white overflow-hidden group border-t-4 border-t-primary/20">
              <CardContent className="p-0">
                {/* Vendor Header */}
                <div className="p-5 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <img src={vendor.avatar || "/placeholder-avatar.jpg"} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100" />
                    <div>
                      <p className="font-bold text-slate-800 leading-none">{vendor.name}</p>
                      <Badge variant="secondary" className="text-[9px] mt-1 h-4 uppercase">{vendor.category}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteVendor(vendor.id, vendor.name)} className="text-slate-300 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Service List */}
                <div className="p-4 space-y-2 max-h-48 overflow-y-auto bg-slate-50/30">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Active Services</p>
                  {vendor.services?.length > 0 ? (
                    vendor.services.map((svc: any) => (
                      <div key={svc.id} className="flex items-center justify-between bg-white p-2 rounded-md border border-slate-100 group/item">
                        <span className="text-xs font-medium text-slate-700 truncate mr-2">{svc.title}</span>
                        <button 
                          onClick={() => handleDeleteService(svc.id, svc.title)}
                          className="opacity-0 group-item-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] italic text-slate-400">No services listed</p>
                  )}
                </div>

                <div className="p-4 border-t border-slate-50 bg-white">
                  <AddServiceModal vendorId={vendor.id} onSuccess={fetchData} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FeedCard title="New Registrations" icon={<UserPlus className="text-blue-500" />} items={activity.users} />
        <FeedCard title="Live Booking Stream" icon={<Activity className="text-primary" />} items={activity.bookings} isBooking />
      </div>
    </div>
  )
}

function QuickStat({ title, value, icon }: any) {
  return (
    <Card className="border-none shadow-sm bg-white hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
      </CardContent>
    </Card>
  )
}

function FeedCard({ title, icon, items, isBooking }: any) {
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="border-b border-slate-50 pb-3">
        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {items.length > 0 ? items.map((item: any) => (
          <div key={item.id} className="p-3 bg-slate-50/50 rounded-lg border border-slate-100 text-sm">
            {isBooking ? (
              <p className="text-slate-700"><b>{item.client?.name}</b> booked <b>{item.service?.title}</b> <span className="text-slate-400 italic">from {item.vendor?.name}</span></p>
            ) : (
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">{item.name}</span>
                <Badge variant="outline" className="text-[9px] uppercase">{item.role}</Badge>
              </div>
            )}
          </div>
        )) : <p className="text-center py-4 text-xs text-slate-400 italic">No recent activity</p>}
      </CardContent>
    </Card>
  )
}