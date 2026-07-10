import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { EmailVerificationForm } from "@/features/auth/components/EmailVerificationForm"

export function EmailVerificationPage() {
  return (
    <AuthLayout
      title=""
      description=""
    >
      <EmailVerificationForm />
    </AuthLayout>
  )
}
