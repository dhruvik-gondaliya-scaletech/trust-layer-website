import type { ReactNode } from "react"
import { ShieldCheck } from "lucide-react"

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
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[520px] px-6 py-10">
        
        {/* Header Section */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">TrustLayer</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Form Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
