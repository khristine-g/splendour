
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Mail, LockKeyhole, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'
import { toast } from 'sonner'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await res.json()

      if (res.ok) {
        login(data.user, data.token)

        toast.success(`Welcome back, ${data.user.name || 'User'}!`)

        router.refresh()
        router.push('/')
      } else {
        setError(data.error || 'Invalid email or password')
      }
    } catch (err) {
      console.error('Login Error:', err)
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Intro */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={15} className="text-[#984653]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#984653]">
            It's lovely to see you again
          </span>
        </div>

        <h2 className="font-serif text-3xl tracking-tight text-[#392B27] sm:text-4xl">
          Welcome back<span className="text-[#984653]">.</span>
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#85776E]">
          Sign in to your Splendour account and pick up
          where you left off.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600"
        >
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <Label
          htmlFor="email"
          className="mb-2 block text-[13px] font-semibold tracking-wide text-[#51433C]"
        >
          Email address
        </Label>

        <div className="relative">
          <Mail
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5978C]"
          />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="h-[54px] rounded-xl border-[#E7DDD3] bg-[#FCFAF7] pl-11 text-sm text-[#392B27] placeholder:text-[#B2A69C] shadow-none transition-all focus-visible:border-[#984653] focus-visible:ring-[3px] focus-visible:ring-[#984653]/10"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-[13px] font-semibold tracking-wide text-[#51433C]"
          >
            Password
          </Label>

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-[#984653] transition-colors hover:text-[#7D3541] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5978C]"
          />

          <Input
            id="password"
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="h-[54px] rounded-xl border-[#E7DDD3] bg-[#FCFAF7] pl-11 pr-12 text-sm text-[#392B27] placeholder:text-[#B2A69C] shadow-none transition-all focus-visible:border-[#984653] focus-visible:ring-[3px] focus-visible:ring-[#984653]/10"
          />

          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            aria-pressed={showPw}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A5978C] transition-colors hover:text-[#984653]"
          >
            {showPw ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="group mt-2 h-[54px] w-full rounded-xl bg-[#984653] text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(152,70,83,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7D3541] hover:shadow-[0_12px_25px_-10px_rgba(152,70,83,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in to Splendour
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </>
        )}
      </Button>

      {/* Register link */}
      <p className="pt-4 text-center text-sm text-[#85776E]">
        Don't have an account?{' '}
        <Link
          href="/auth/register"
          className="font-semibold text-[#984653] hover:underline"
        >
          Create one
        </Link>
      </p>

    </form>
  )
}
