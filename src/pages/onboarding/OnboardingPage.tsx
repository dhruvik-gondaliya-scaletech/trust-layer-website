import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { OnboardingLayout } from "@/features/onboarding/components/OnboardingLayout"
import { CompanyDetailsForm } from "@/features/onboarding/components/CompanyDetailsForm"
import { PersonalVerificationForm } from "@/features/onboarding/components/PersonalVerificationForm"
import { IdentityVerificationForm } from "@/features/onboarding/components/IdentityVerificationForm"
import { BankAccountForm } from "@/features/onboarding/components/BankAccountForm"
import { TrustScoreView } from "@/features/onboarding/components/TrustScoreView"

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 5))
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1))

  const handleComplete = () => {
    // Navigate to the main dashboard when onboarding is complete
    navigate("/")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanyDetailsForm onNext={nextStep} />
      case 2:
        return <PersonalVerificationForm onNext={nextStep} />
      case 3:
        return <IdentityVerificationForm onNext={nextStep} />
      case 4:
        return <BankAccountForm onNext={nextStep} />
      case 5:
        return <TrustScoreView onComplete={handleComplete} />
      default:
        return null
    }
  }

  const getStepTitleAndDescription = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Company Details",
          description: "Let's start by getting some basic information about your business."
        }
      case 2:
        return {
          title: "Personal Verification",
          description: "Tell us about yourself. This helps us ensure the security of the platform."
        }
      case 3:
        return {
          title: "Identity Verification",
          description: "Upload a valid government-issued ID to verify your identity."
        }
      case 4:
        return {
          title: "Bank Account",
          description: "Connect a bank account to start sending and receiving payments."
        }
      case 5:
        return {
          title: "TrustScore Generated",
          description: "Congratulations! Your account has been verified."
        }
      default:
        return { title: "", description: "" }
    }
  }

  const { title, description } = getStepTitleAndDescription()

  // Presentation only — the flow (steps 1→5, next/back) is unchanged.
  const canGoBack = currentStep > 1 && currentStep < 5

  return (
    <OnboardingLayout
      currentStep={currentStep}
      title={title}
      description={description}
      showHeader={currentStep < 5}
      onBack={canGoBack ? prevStep : undefined}
    >
      {renderStepContent()}
    </OnboardingLayout>
  )
}
