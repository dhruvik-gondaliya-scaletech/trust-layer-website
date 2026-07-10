import { useState } from "react"
import { RegistrationLayout } from "@/features/auth/components/RegistrationLayout"
import { RegisterForm } from "@/features/auth/components/RegisterForm"
import { EmailVerificationForm } from "@/features/auth/components/EmailVerificationForm"
import { ActionSuccessView } from "@/features/auth/components/ActionSuccessView"
import { PhoneVerificationForm } from "@/features/auth/components/PhoneVerificationForm"
import { OTPVerificationForm } from "@/features/auth/components/OTPVerificationForm"
import { ProfileSetupForm } from "@/features/auth/components/ProfileSetupForm"

export function RegistrationFlowPage() {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => Math.max(1, s - 1))

  // Determine macro step based on current sequence
  // 1-3 = Email
  // 4-6 = Phone
  // 7-8 = Profile
  let macroStep = 1
  if (step >= 4 && step <= 6) macroStep = 2
  if (step >= 7) macroStep = 3

  const getStepContent = () => {
    switch (step) {
      case 1:
        return {
          title: "Create Your TrustLayer Account",
          description: "Enter your information to begin secure private transactions.",
          content: <RegisterForm onNext={nextStep} />
        }
      case 2:
        return {
          title: "Verify Your Email",
          description: "We've sent a secure verification link to your inbox. Check your email to continue.",
          content: <EmailVerificationForm onNext={nextStep} />
        }
      case 3:
        return {
          title: "Email Verified",
          description: "Your email address has been successfully verified.",
          content: <ActionSuccessView onNext={nextStep} buttonText="Continue to Phone Verification" />
        }
      case 4:
        return {
          title: "Verify Your Phone",
          description: "Secure your account with phone verification.",
          content: <PhoneVerificationForm onNext={nextStep} />
        }
      case 5:
        return {
          title: "Enter Security Code",
          description: "We've sent a 6-digit code to your phone number.",
          content: <OTPVerificationForm onNext={nextStep} />
        }
      case 6:
        return {
          title: "Phone Verified",
          description: "Your phone number has been successfully verified.",
          content: <ActionSuccessView onNext={nextStep} buttonText="Continue to Profile Setup" />
        }
      case 7:
        return {
          title: "Complete Your Profile",
          description: "Help buyers and sellers know who they're trading with.",
          content: <ProfileSetupForm onNext={() => setStep(8)} />
        }
      case 8:
        return {
          title: "Account Completed",
          description: "Your TrustLayer account is fully set up and ready to use.",
          content: <ActionSuccessView onNext={() => window.location.href = '/dashboard'} buttonText="Go to Dashboard" />
        }
      default:
        return {
          title: "Error",
          description: "Unknown step.",
          content: <div />
        }
    }
  }

  const { title, description, content } = getStepContent()

  // Hide progress and header on success screens for a cleaner look
  const isSuccessScreen = step === 3 || step === 6 || step === 8

  return (
    <RegistrationLayout
      macroStep={macroStep}
      title={title}
      description={description}
      onBack={step > 1 && !isSuccessScreen ? prevStep : undefined}
      hideProgress={isSuccessScreen}
      hideHeader={false}
    >
      {content}
    </RegistrationLayout>
  )
}
