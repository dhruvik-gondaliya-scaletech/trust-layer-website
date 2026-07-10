import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { OTPVerificationForm } from "@/features/auth/components/OTPVerificationForm"

export function OTPVerificationPage() {
  return (
    <AuthLayout
      title="Verify your identity"
      description="We've sent a 6-digit code to your email."
    >
      <OTPVerificationForm />
    </AuthLayout>
  )
}
