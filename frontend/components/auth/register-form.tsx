'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'
import { toast } from 'sonner'

export function RegisterForm() {
  const { login } = useAuth()
  
  // CAPSTONE SIMPLIFICATION: 
  // Public registration is now only for CLIENTS. 
  // Admins are created via seed, and Vendors are managed by Admin.
  const role = 'CLIENT'
  
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

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
          role, // Hardcoded to 'CLIENT'
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Registration failed')
      }

      setIsSuccess(true)
      toast.success("Account created successfully!")

      // Sync global auth state and redirect
      login(data.user, data.token)

    } catch (err: any) {
      console.error("Signup error:", err.message)
      setError(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-xl font-bold">Welcome to Splendour!</h2>
        <p className="text-muted-foreground text-sm">Redirecting you to your dashboard...</p>
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
          {error}
        </div>
      )}

      {/* NOTE: Role Selector Div removed for project simplification. 
          All public signups are Clients.
      */}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            type="text" 
            value={form.name} 
            onChange={update('name')} 
            placeholder="e.g. Stella Nguyo" 
            required 
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            value={form.email} 
            onChange={update('email')} 
            placeholder="stella@example.com" 
            required 
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number (M-Pesa reachable)</Label>
          <Input 
            id="phone" 
            type="tel" 
            value={form.phone} 
            onChange={update('phone')} 
            placeholder="+254 7..." 
            required 
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Create Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPw ? 'text' : 'password'} 
              value={form.password} 
              onChange={update('password')} 
              placeholder="Min 8 characters" 
              required 
              minLength={8} 
              className="pr-10" 
            />
            <button 
              type="button" 
              onClick={() => setShowPw(!showPw)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full py-6 text-base font-bold" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Setting up your profile...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-bold text-primary hover:underline">
          Sign in here
        </Link>
      </p>
    </form>
  )
}