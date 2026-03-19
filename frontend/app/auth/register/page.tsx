//app/auth/register/page.tsx

import { AuthLayout } from '@/components/auth/auth-layout'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata = { title: 'Create Account — Splendour Events' }

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of clients and vendors on Splendour Events"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
