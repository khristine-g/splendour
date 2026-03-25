'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation' 
import { Search, X, Loader2 } from 'lucide-react'
import { VendorCard } from '@/components/vendors/vendor-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export function VendorsListing() {
  const searchParams = useSearchParams()
  

  const [allVendors, setAllVendors] = useState([])
  const [categories, setCategories] = useState<{name: string}[]>([])
  const [loading, setLoading] = useState(true)

  
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

 
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [vendorsRes, catsRes] = await Promise.all([
          fetch('http://localhost:5000/api/vendors'),
          fetch('http://localhost:5000/api/categories')
        ])

        const vendorsData = await vendorsRes.json()
        const catsData = await catsRes.json()

        setAllVendors(vendorsData)
        setCategories(catsData)

    
        const urlCat = searchParams.get('category')
        if (urlCat) setCategory(urlCat)

      } catch (error) {
        console.error("Failed to sync with database:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [searchParams])

 
  const filtered = allVendors
    .filter((v: any) => {
      const matchSearch = 
        !search || 
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.location.toLowerCase().includes(search.toLowerCase())
      
      const matchCategory = category === 'All' || v.category === category
      return matchSearch && matchCategory
    })
    .sort((a: any, b: any) => {
      if (sortBy === 'price_low') return a.startingPrice - b.startingPrice
      if (sortBy === 'price_high') return b.startingPrice - a.startingPrice
      return b.rating - a.rating
    })

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="font-medium text-muted-foreground tracking-tight">Syncing with Splendour Database...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
   
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold sm:text-5xl tracking-tight">Find Vendors</h1>
          <p className="mt-4 text-lg text-primary-foreground/70">Browse verified event professionals across Nigeria.</p>
          
          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl bg-white/10 p-2 backdrop-blur-md border border-white/20">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-primary-foreground/50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full bg-transparent py-3 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/40"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-white/60 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
         
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('All')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all border ${
                category === 'All'
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground hover:bg-muted border-border'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all border ${
                  category === cat.name
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                    : 'bg-card text-muted-foreground hover:bg-muted border-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sort By</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-card border-border">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((vendor: any) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="flex h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 text-center">
            <h3 className="text-xl font-bold">No matches found</h3>
            <p className="mt-2 text-muted-foreground max-w-xs">We couldn't find any {category !== 'All' ? category : ''} vendors matching your search.</p>
            <Button 
              variant="outline" 
              onClick={() => {setSearch(''); setCategory('All')}}
              className="mt-6 rounded-xl"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}