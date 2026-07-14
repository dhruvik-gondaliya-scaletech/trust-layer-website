import type { ReactNode } from "react"
import { ShieldCheck, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface RegistrationLayoutProps {
  children: ReactNode
  macroStep: number // 1 (Email), 2 (Phone), 3 (Profile)
  title: string
  description: string
  onBack?: () => void
  hideProgress?: boolean
  hideHeader?: boolean
  hideStepper?: boolean
}

export function RegistrationLayout({
  children,
  macroStep,
  title,
  description,
  onBack,
  hideProgress = false,
  hideHeader = false,
  hideStepper = false,
}: RegistrationLayoutProps) {
  
  const progressSteps = [
    { id: 1, name: "Email" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Profile" },
  ]

  return (
    <div className="flex min-h-screen w-full bg-background flex-col items-center relative">
      {/* Absolute Back Button */}
      {onBack && (
        <div className="absolute top-8 left-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-[520px] px-6 py-6 lg:py-10">
        
        {/* Header / Progress Section */}
        {!hideHeader && (
          <div className="w-full mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">TrustLayer</span>
            </div>

            {!hideStepper && (
              <div className="w-full flex flex-col items-center mb-6">
                <div className="text-[15px] font-semibold text-foreground mb-3">
                  Step {macroStep} of 3
                </div>

                {!hideProgress && (
                  <div className="flex items-center justify-center w-[340px] max-w-full">
                    {progressSteps.map((s, i) => {
                      const isCompleted = macroStep > s.id
                      const isCurrent = macroStep === s.id
                      
                      return (
                        <div key={s.id} className="flex items-center">
                          {/* Pill */}
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                              isCompleted
                                ? "bg-green-50 border-green-200 text-green-700"
                                : isCurrent
                                ? "bg-blue-50 border-blue-200 text-blue-700"
                                : "bg-white border-gray-200 text-muted-foreground"
                            }`}
                          >
                            {isCompleted ? (
                              <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                              </div>
                            ) : isCurrent ? (
                              <div className="h-2 w-2 rounded-full bg-blue-600" />
                            ) : (
                              <div className="h-2.5 w-2.5 rounded-full border-[2px] border-muted-foreground/40" />
                            )}
                            {s.name}
                          </div>

                          {/* Connecting Line */}
                          {i < progressSteps.length - 1 && (
                            <div className="h-[1px] w-4 sm:w-6 bg-border mx-1 sm:mx-2" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              {description}
            </p>
          </div>
        )}

        {/* Form Container with Transitions */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        
      </main>
    </div>
  )
}
