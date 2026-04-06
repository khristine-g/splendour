'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Plus, Loader2, Store, MapPin } from 'lucide-react'
import { toast } from 'sonner'


interface AddVendorModalProps {
  onSuccess: () => void;
  vendorId?: string; 
}

export function AddVendorModal({ onSuccess, vendorId }: AddVendorModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    email: '',
    price: '',
    tagline: '',
    avatar: '',
    cover: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

 
    const url = vendorId 
      ? 'http://localhost:5000/api/admin/add-service' 
      : 'http://localhost:5000/api/admin/add-vendor';


    const submissionData = vendorId ? {
        vendorId,
        title: formData.name,
        category: formData.category,
        price: parseInt(formData.price) || 0,
        description: formData.tagline,
        image: formData.cover || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    } : {
        ...formData,
        price: parseInt(formData.price) || 0,
        avatar: formData.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
        cover: formData.cover || "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?w=800&q=80"
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      })

      if (res.ok) {
        toast.success(vendorId ? "New service listed!" : "Vendor added to Marketplace!")
        setOpen(false)
      
        setFormData({ name: '', category: '', location: '', email: '', price: '', tagline: '', avatar: '', cover: '' })
        onSuccess()
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || "Action failed")
      }
    } catch (err) {
      toast.error("Backend connection failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
 
        <Button className="bg-black-800 hover:bg-slate-900 text-black gap-2 shadow-md relative z-10">
          <Plus className="h-4 w-4" /> 
          {vendorId ? "Add New Service" : "Onboard New Vendor"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[550px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif flex items-center gap-2">
            <Store className="h-6 w-6 text-emerald-600" /> 
            {vendorId ? "List a New Service" : "New Vendor Registration"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 pt-4">
          <div className="col-span-2 space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">
              {vendorId ? "Service Title" : "Business Name"}
            </label>
            <Input 
              placeholder={vendorId ? "e.g. Wedding Photography Gold" : "e.g. Swahili Plate Catering"} 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Category</label>
            <Input 
              placeholder="e.g. Catering" 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Price (KES)</label>
            <Input 
              type="number"
              placeholder="2500" 
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              required 
            />
          </div>

          <div className="col-span-2 space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">
              {vendorId ? "Description" : "Tagline"}
            </label>
            <Input 
              placeholder="Brief overview of what is offered..." 
              value={formData.tagline}
              onChange={e => setFormData({...formData, tagline: e.target.value})}
              required 
            />
          </div>

          {!vendorId && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-muted-foreground">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9"
                  placeholder="Nyali, Mombasa" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required 
                />
              </div>
            </div>
          )}

          {!vendorId && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-muted-foreground">Contact Email</label>
              <Input 
                type="email"
                placeholder="support@vendor.com" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">
              {vendorId ? "Service Image URL" : "Thumbnail / Avatar URL"}
            </label>
            <Input 
              placeholder="https://images.unsplash.com/..." 
              value={vendorId ? formData.cover : formData.avatar}
              onChange={e => setFormData(vendorId ? {...formData, cover: e.target.value} : {...formData, avatar: e.target.value})}
            />
          </div>

          {!vendorId && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-muted-foreground">Hero / Cover URL</label>
              <Input 
                placeholder="https://images.unsplash.com/..." 
                value={formData.cover}
                onChange={e => setFormData({...formData, cover: e.target.value})}
              />
            </div>
          )}

          <Button type="submit" className="col-span-2 mt-4 bg-emerald-600 hover:bg-emerald-700 h-12 text-white font-bold" disabled={loading}>
            {loading ? <Loader2 className="animate-spin text-white" /> : vendorId ? "List Service" : "Publish to Marketplace"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}