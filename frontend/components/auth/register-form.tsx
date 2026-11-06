
'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import Link from 'next/link'
import {
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export function RegisterForm() {
  const { login } = useAuth()

  const role = 'CLIENT'

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })

  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const update =
    (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      if (error) setError(null)
    }

  const passwordStrength = (() => {
    const password = form.password
    if (!password) return 0

    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    return score
  })()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            role,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || data.message || 'Registration failed'
        )
      }

      setIsSuccess(true)
      toast.success('Account created successfully!')

      login(data.user, data.token)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong'

      console.error('Signup error:', message)
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'h-[52px] w-full rounded-xl border border-[#E7DDD3] bg-[#FCFAF7] pl-11 pr-4 text-sm text-[#392B27] placeholder:text-[#B2A69C] outline-none transition-all duration-200 focus:border-[#984653] focus:bg-white focus:ring-[3px] focus:ring-[#984653]/10'

  const labelClass =
    'mb-2 block text-[13px] font-semibold tracking-wide text-[#51433C]'

  // Registration success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F0E7]">
          <CheckCircle2 className="h-8 w-8 text-[#63815D]" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#984653]">
          You're all set
        </p>

        <h2 className="font-serif text-3xl text-[#392B27]">
          Welcome to Splendour.
        </h2>

        <p className="mt-3 max-w-xs text-sm leading-6 text-[#85776E]">
          Your account is ready. We're excited to help you bring
          your next celebration to life.
        </p>

        <Loader2 className="mt-7 h-5 w-5 animate-spin text-[#984653]" />

        <p className="mt-2 text-xs text-[#A3978E]">
          Taking you to your dashboard...
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">

      {/* Intro */}
      <div className="mb-7">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={15} className="text-[#984653]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#984653]">
            Your celebration starts here
          </span>
        </div>

        <h2 className="font-serif text-3xl tracking-tight text-[#392B27] sm:text-4xl">
          Create your account
          <span className="text-[#984653]">.</span>
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#85776E]">
          Join Splendour and discover the people who make
          unforgettable celebrations happen.
        </p>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 overflow-hidden"
          >
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form fields */}
      <div className="space-y-4">

        {/* Full name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5978C]"
            />

            <input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={update('name')}
              placeholder="Your full name"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5978C]"
            />

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number
          </label>

          <div className="relative">
            <Phone
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5978C]"
            />

            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={update('phone')}
              placeholder="+254 7XX XXX XXX"
              className={inputClass}
              required
            />
          </div>

          <p className="mt-1.5 text-[11px] text-[#A3978E]">
            Use a number we can reach you on for booking updates.
          </p>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className={labelClass}>
            Create password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5978C]"
            />

            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.password}
              onChange={update('password')}
              placeholder="Create a strong password"
              className={`${inputClass} pr-12`}
              required
              minLength={8}
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

          {/* Password strength */}
          {form.password.length > 0 && (
            <div className="mt-3">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      passwordStrength >= level
                        ? passwordStrength <= 1
                          ? 'bg-red-400'
                          : passwordStrength <= 2
                            ? 'bg-amber-400'
                            : 'bg-[#79906F]'
                        : 'bg-[#E9E1D9]'
                    }`}
                  />
                ))}
              </div>

              <p className="mt-1.5 text-[11px] text-[#96877D]">
                {passwordStrength <= 1
                  ? 'Weak password'
                  : passwordStrength === 2
                    ? 'Fair password'
                    : passwordStrength === 3
                      ? 'Good password'
                      : 'Strong password'}
              </p>
            </div>
          )}

          <p className="mt-2 text-[11px] text-[#A3978E]">
            Use at least 8 characters.
          </p>
        </div>
      </div>

      {/* Privacy note */}
      <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#F5F0E9] p-3.5">
        <ShieldCheck
          size={17}
          className="mt-0.5 shrink-0 text-[#79836A]"
        />

        <p className="text-xs leading-5 text-[#786B60]">
          Your details help us make your booking experience
          seamless. Your information is handled securely.
        </p>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="group mt-6 flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#984653] px-6 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(152,70,83,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7D3541] hover:shadow-[0_12px_25px_-10px_rgba(152,70,83,0.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Creating your account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      {/* Sign in link */}
      <p className="mt-6 text-center text-sm text-[#85776E]">
        Already a member?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-[#984653] hover:underline"
        >
          Sign in
        </Link>
      </p>

      {/* Terms */}
      <p className="mt-6 text-center text-[10px] leading-5 text-[#B0A49A]">
        By creating an account, you agree to our Terms of Service
        and Privacy Policy.
      </p>
    </form>
  )
}
