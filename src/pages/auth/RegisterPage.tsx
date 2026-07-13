import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { RegisterForm } from "@/features/auth/components/RegisterForm"
import { useNavigate } from "react-router-dom"

export function RegisterPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout
      title="Create Your TrustLayer Account"
      description="Create your account to begin secure private transactions."
      leftPanelTitle="Secure Deals. Trusted Payments."
      leftPanelDescription="Create your TrustLayer account and protect every private transaction from payment to delivery."
      leftPanelFeatures={[
        "Buyer & Seller Protection",
        "Protected Payments",
        "Secure Verification",
        "Private Marketplace Transactions"
      ]}
    >
      <RegisterForm onNext={() => navigate('/verify-account')} />
    </AuthLayout>
  )
}
