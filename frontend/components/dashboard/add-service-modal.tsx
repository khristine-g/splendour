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
import { Plus, Loader2, X, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner' // Optional: for notifications

interface AddServiceModalProps {
  vendorId: string
  onSuccess: () => void
}

export function AddServiceModal({ vendorId, onSuccess }: AddServiceModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // State for dynamic inclusions
  const [inclusionInput, setInclusionInput] = useState('')
  const [inclusions, setInclusions] = useState<string[]>([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    priceType: 'flat',
    image: '',
    duration: '', // Added based on your Prisma Schema
  })

  // Add an item to the inclusions array
  const addInclusion = () => {
    if (inclusionInput.trim()) {
      setInclusions([...inclusions, inclusionInput.trim()])
      setInclusionInput('')
    }
  }

  // Remove an item from the inclusions array
  const removeInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: parseInt(formData.price), // Must be Int for Prisma
          priceType: formData.priceType,
          duration: formData.duration || null,
          image: formData.image || "/placeholder-service.jpg",
          inclusions: inclusions, // Sending the String[] array
          vendorId: vendorId,
        })
      })

      if (res.ok) {
        setOpen(false)
        // Reset Form
        setFormData({ title: '', description: '', price: '', category: '', priceType: 'flat', image: '', duration: '' })
        setInclusions([])
        onSuccess()
        toast.success("Service published successfully!")
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || "Failed to add service")
      }
    } catch (err) {
      console.error("Failed to add service:", err)
      toast.error("Connection error to backend")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 shadow-lg" size="lg">
          <Plus className="h-4 w-4" /> Add New Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">New Service Offering</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Service Title</label>
              <Input 
                placeholder="e.g. Full Day Wedding Photography" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Description</label>
              <Textarea 
                placeholder="Describe what makes this service special..." 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required 
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Price & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Price (KES)</label>
              <Input 
                type="number" 
                placeholder="50000" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Pricing Unit</label>
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

          {/* Category & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Category</label>
              <Input 
                placeholder="e.g. Photography" 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Duration (Optional)</label>
              <Input 
                placeholder="e.g. 8 Hours" 
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Cover Image URL</label>
            <Input 
              placeholder="https://images.unsplash.com/..." 
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})} 
            />
          </div>

          {/* Inclusions Section */}
          <div className="space-y-3 p-4 bg-muted/30 rounded-xl border border-dashed">
            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" /> What&apos;s Included?
            </label>
            <div className="flex gap-2">
              <Input 
                placeholder="Add an item (e.g. 200 edited photos)" 
                value={inclusionInput}
                onChange={(e) => setInclusionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInclusion();
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={addInclusion}>Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {inclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-1 bg-background border px-2 py-1 rounded-md text-xs">
                  {item}
                  <button type="button" onClick={() => removeInclusion(index)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Publish Service Package"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}