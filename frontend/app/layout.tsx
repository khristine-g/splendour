import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context' 
import { Toaster } from "@/components/ui/sonner"
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Splendour Events — Find & Book Event Professionals',
  description: 'Discover and book top-rated photographers, caterers, decorators, DJs, and MCs for your perfect event.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" expand={false} richColors />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}