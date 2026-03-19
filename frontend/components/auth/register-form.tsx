'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/auth-context' // 1. Import Auth Context

export function RegisterForm() {
  const { login } = useAuth() // 2. Grab login function
  const searchParams = useSearchParams()
  const router = useRouter()

  // Use uppercase to match your Prisma Enum: Role { CLIENT, VENDOR }
  const [role, setRole] = useState<'CLIENT' | 'VENDOR'>(
    searchParams.get('role')?.toUpperCase() === 'VENDOR' ? 'VENDOR' : 'CLIENT',
  )
  
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          role, 
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // 3. Update global auth state immediately
      login(data.user, data.token)

      // 4. Personalized redirect
      if (role === 'VENDOR') {
        router.push('/vendor/dashboard')
      } else {
        router.push('/') // Send clients to the home page to start browsing
      }
      
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Role selector */}
      <div className="grid grid-cols-2 gap-3">
        {(['CLIENT', 'VENDOR'] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              'rounded-xl border p-3 text-left transition-colors',
              role === r
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50',
            )}
          >
            <p className="font-semibold capitalize text-sm">{r.toLowerCase()}</p>
            <p className="text-[10px] mt-0.5 opacity-70">
              {r === 'CLIENT' ? 'Find & book vendors' : 'Offer your services'}
            </p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" type="text" value={form.name} onChange={update('name')} placeholder="Your full name" required className="mt-1.5" />
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" required className="mt-1.5" />
        </div>

        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={update('phone')} placeholder="+254 700 000 000" className="mt-1.5" />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1.5">
            <Input id="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={update('password')} placeholder="Min 8 characters" required minLength={8} className="pr-10" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          `Create ${role === 'VENDOR' ? 'Vendor' : 'Client'} Account`
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}