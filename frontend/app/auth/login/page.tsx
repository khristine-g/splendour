//app/auth/login/page.tsx
import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'

export const metadata = { title: 'Sign In — Splendour Events' }

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Splendour Events account"
    >
      <LoginForm />
    </AuthLayout>
  )
}
