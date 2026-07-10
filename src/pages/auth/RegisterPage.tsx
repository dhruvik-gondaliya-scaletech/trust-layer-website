import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to get started with TrustLayer"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
