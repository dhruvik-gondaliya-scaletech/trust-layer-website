import type { ReactNode } from "react"
import { ShieldCheck } from "lucide-react"

import { Check } from "lucide-react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
  leftPanelTitle?: string
  leftPanelDescription?: string
  leftPanelFeatures?: string[]
}

export function AuthLayout({ 
  children, 
  title, 
  description,
  leftPanelTitle = "Secure Deals and Payments.",
  leftPanelDescription = "Join thousands of businesses globally using TrustLayer to unify their transactions safely.",
  leftPanelFeatures
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Panel: Illustration / Branding (Hidden on Mobile, Visible on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-muted/30 border-r p-12 text-foreground relative overflow-hidden">
        
        <div className="relative z-10 flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">TrustLayer</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {leftPanelTitle}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {leftPanelDescription}
          </p>
          
          {leftPanelFeatures && leftPanelFeatures.length > 0 && (
            <ul className="space-y-3">
              {leftPanelFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-base">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">TrustLayer</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Form Content */}
          <div className="bg-card p-0 sm:p-8 sm:shadow-sm sm:rounded-xl sm:border">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
