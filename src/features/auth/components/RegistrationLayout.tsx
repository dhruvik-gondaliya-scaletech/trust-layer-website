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
}

export function RegistrationLayout({
  children,
  macroStep,
  title,
  description,
  onBack,
  hideProgress = false,
  hideHeader = false,
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
      <main className="flex-1 flex flex-col items-center w-full max-w-[560px] px-6 py-12 lg:py-20">
        
        {/* Header / Progress Section */}
        {!hideHeader && (
          <div className="w-full mb-10 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-8">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">TrustLayer</span>
            </div>

            <div className="text-sm font-bold text-muted-foreground tracking-wider uppercase mb-2">
              STEP {macroStep} OF 3
            </div>

            {!hideProgress && (
              <div className="flex items-center gap-2 mb-8 text-sm font-medium">
                {progressSteps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 ${macroStep > s.id ? 'text-primary' : macroStep === s.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {macroStep > s.id ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : macroStep === s.id ? (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      ) : (
                        <span className="h-2 w-2 rounded-full border-2 border-muted-foreground" />
                      )}
                      {s.name}
                    </span>
                    {i < progressSteps.length - 1 && (
                      <div className="h-px w-8 bg-border hidden sm:block mx-2" />
                    )}
                  </div>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="mt-3 text-base text-muted-foreground">
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
