import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { LoginForm } from "@/features/auth/components/LoginForm"

export function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your account"
    >
      <LoginForm />
    </AuthLayout>
  )
}
