import type { ReactNode } from "react"
import { ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  title: string
  description: string
}

export function OnboardingLayout({ children, currentStep, title, description }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background flex-col items-center">
      {/* Top minimal header */}
      <header className="w-full py-8 px-6 flex justify-center sm:justify-start">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">TrustLayer</span>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-[520px] px-6 py-12 lg:py-20">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <div className="mb-10 text-center sm:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
              <p className="mt-3 text-base text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="w-full">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
        
      </main>
    </div>
  )
}
