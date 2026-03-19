'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Image as ImageIcon, Plus, Loader2, X } from 'lucide-react'
import Image from 'next/image'

interface PortfolioManagerProps {
  vendorId: string
  initialImages: string[]
  onUpdate: () => void
}

export function PortfolioManager({ vendorId, initialImages, onUpdate }: PortfolioManagerProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddImage = async () => {
    if (!url) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/vendors/${vendorId}/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url })
      })

      if (res.ok) {
        setUrl('')
        onUpdate()
      }
    } catch (err) {
      console.error("Portfolio error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="font-serif text-lg flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Portfolio Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Image Input */}
        <div className="flex gap-2">
          <Input 
            placeholder="Paste image URL..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleAddImage} disabled={loading || !url}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-2">
          {initialImages.map((img, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <Image 
                src={img} 
                alt="Portfolio item" 
                fill 
                className="object-cover transition-transform group-hover:scale-110" 
              />
            </div>
          ))}
          {initialImages.length === 0 && (
            <div className="col-span-3 py-10 text-center border-2 border-dashed rounded-lg">
              <p className="text-xs text-muted-foreground">No images yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}