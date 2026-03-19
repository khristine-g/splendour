'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Loader2 } from 'lucide-react'

interface AddServiceModalProps {
  vendorId: string
  onSuccess: () => void
}

export function AddServiceModal({ vendorId, onSuccess }: AddServiceModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    priceType: 'flat',
    image: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          vendorId,
          price: parseInt(formData.price),
          inclusions: [] // You can add a dynamic list for this later
        })
      })

      if (res.ok) {
        setOpen(false)
        setFormData({ title: '', description: '', price: '', category: '', priceType: 'flat', image: '' })
        onSuccess() // This refreshes the dashboard data
      }
    } catch (err) {
      console.error("Failed to add service:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 shadow-sm" size="lg">
          <Plus className="h-4 w-4" /> Add New Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Create Service Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Service Title</label>
            <Input 
              placeholder="e.g. Premium Wedding Photography" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Description</label>
            <Textarea 
              placeholder="What does this service include?" 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Price ($)</label>
              <Input 
                type="number" 
                placeholder="500" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Pricing Type</label>
              <Select 
                value={formData.priceType} 
                onValueChange={(val) => setFormData({...formData, priceType: val})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat Fee</SelectItem>
                  <SelectItem value="per_person">Per Person</SelectItem>
                  <SelectItem value="per_hour">Per Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Category</label>
            <Input 
              placeholder="e.g. Photography" 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})} 
              required 
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish Service"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}