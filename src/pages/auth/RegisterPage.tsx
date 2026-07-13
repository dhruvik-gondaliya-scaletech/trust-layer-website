import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { RegisterForm } from "@/features/auth/components/RegisterForm"
import { useNavigate } from "react-router-dom"

export function RegisterPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout
      title="Create Account"
      description="Create your account to start trusted transactions."
    >
      <RegisterForm onNext={() => navigate('/verify-account')} />
    </AuthLayout>
  )
}
