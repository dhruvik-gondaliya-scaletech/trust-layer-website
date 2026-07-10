import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm"

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email address and we'll send you a link to reset your password"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
