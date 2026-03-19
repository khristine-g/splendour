export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  category: string
}

// Services available for booking - prices in cents
export const PRODUCTS: Product[] = [
  {
    id: 'photography-basic',
    name: 'Basic Photography Package',
    description: '4 hours of professional photography coverage',
    priceInCents: 80000, // $800
    category: 'Photography',
  },
  {
    id: 'photography-premium',
    name: 'Premium Photography Package',
    description: '8 hours coverage with album and prints',
    priceInCents: 150000, // $1,500
    category: 'Photography',
  },
  {
    id: 'catering-standard',
    name: 'Standard Catering Package',
    description: 'Full catering service for up to 100 guests',
    priceInCents: 250000, // $2,500
    category: 'Catering',
  },
  {
    id: 'catering-premium',
    name: 'Premium Catering Package',
    description: 'Gourmet catering with chef on-site for up to 150 guests',
    priceInCents: 450000, // $4,500
    category: 'Catering',
  },
  {
    id: 'decoration-basic',
    name: 'Basic Decoration Package',
    description: 'Essential venue decoration and setup',
    priceInCents: 120000, // $1,200
    category: 'Decoration',
  },
  {
    id: 'decoration-premium',
    name: 'Premium Decoration Package',
    description: 'Full venue transformation with custom themes',
    priceInCents: 350000, // $3,500
    category: 'Decoration',
  },
  {
    id: 'dj-standard',
    name: 'DJ Entertainment Package',
    description: '5 hours of DJ service with sound system',
    priceInCents: 100000, // $1,000
    category: 'Entertainment',
  },
  {
    id: 'mc-hosting',
    name: 'Professional MC Services',
    description: 'Full event hosting and coordination',
    priceInCents: 80000, // $800
    category: 'Entertainment',
  },
]

// Helper to get product by ID
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

// Helper to format price
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toLocaleString()}`
}
