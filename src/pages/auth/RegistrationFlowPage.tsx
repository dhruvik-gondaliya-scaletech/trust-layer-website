import { useState } from "react"
import { RegistrationLayout } from "@/features/auth/components/RegistrationLayout"
import { EmailVerificationForm } from "@/features/auth/components/EmailVerificationForm"
import { ActionSuccessView } from "@/features/auth/components/ActionSuccessView"
import { PhoneVerificationForm } from "@/features/auth/components/PhoneVerificationForm"
import { OTPVerificationForm } from "@/features/auth/components/OTPVerificationForm"
import { ProfileSetupForm } from "@/features/auth/components/ProfileSetupForm"
import { CheckCircle2 } from "lucide-react"

export function RegistrationFlowPage() {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => Math.max(1, s - 1))

  // Determine macro step based on current sequence
  // 1-2 = Email
  // 3-5 = Phone
  // 6-7 = Profile
  let macroStep = 1
  if (step >= 3 && step <= 5) macroStep = 2
  if (step >= 6) macroStep = 3

  const getStepContent = () => {
    switch (step) {
      case 1:
        return {
          title: "Verify Your Email",
          description: "We've sent a secure verification link to your inbox. Check your email to continue.",
          content: <EmailVerificationForm onNext={nextStep} />
        }
      case 2:
        return {
          title: "Email Verified",
          description: "Your email has been successfully verified and secured for TrustLayer transactions.",
          content: (
            <ActionSuccessView onNext={nextStep} buttonText="Continue to Phone Verification">
              <div className="bg-card border rounded-xl p-4 sm:p-5 mb-3">
                <div className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">
                  ACCOUNT SETUP PROGRESS
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">Email Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium text-primary">Phone Verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                    <span className="text-muted-foreground">Profile Setup</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
                <div className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 hidden" /> 
                  Why verify your email?
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                  <li>Receive transaction updates</li>
                  <li>Receive deal updates</li>
                  <li>Protect your account from unauthorized access</li>
                  <li>Recover your account if needed</li>
                </ul>
              </div>
            </ActionSuccessView>
          )
        }
      case 3:
        return {
          title: "Verify Your Phone",
          description: "Secure your account with phone verification.",
          content: <PhoneVerificationForm onNext={nextStep} />
        }
      case 4:
        return {
          title: "Enter Security Code",
          description: "We've sent a 6-digit code to your phone number.",
          content: <OTPVerificationForm onNext={nextStep} />
        }
      case 5:
        return {
          title: "Phone Verified",
          description: "Your phone number has been successfully verified.",
          content: (
            <ActionSuccessView onNext={nextStep} buttonText="Continue to Profile Setup">
              <div className="bg-card border rounded-xl p-4 sm:p-5 mb-3">
                <div className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">
                  ACCOUNT SETUP PROGRESS
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">Email Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">Phone Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium text-primary">Profile Setup</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
                <div className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 hidden" /> 
                  Why verify your phone?
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
                  <li>Protect your account from fraud</li>
                  <li>Receive SMS notifications</li>
                  <li>Secure account recovery</li>
                  <li>Increase buyer and seller trust</li>
                </ul>
              </div>
            </ActionSuccessView>
          )
        }
      case 6:
        return {
          title: "Complete Your Profile",
          description: "Help buyers and sellers know who they're trading with.",
          content: <ProfileSetupForm onNext={() => setStep(7)} />
        }
      case 7:
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
  const isSuccessScreen = step === 2 || step === 5 || step === 7

  return (
    <RegistrationLayout
      macroStep={macroStep}
      title={title}
      description={description}
      onBack={step > 1 && !isSuccessScreen ? prevStep : undefined}
      hideProgress={isSuccessScreen}
      hideHeader={false}
      hideStepper={false}
    >
      {content}
    </RegistrationLayout>
  )
}
