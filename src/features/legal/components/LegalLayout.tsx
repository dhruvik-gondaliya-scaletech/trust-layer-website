import { type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center py-6 px-4 sm:py-10 md:py-16">
      <div className="w-full max-w-[760px] bg-card rounded-2xl sm:rounded-3xl shadow-sm sm:shadow-md border overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center px-4 py-4 sm:px-6 sm:py-5 border-b sticky top-0 bg-card z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full flex-shrink-0">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base sm:text-lg font-bold flex-1 text-center pr-10">{title}</h1>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 md:p-12">
          <p className="text-xs sm:text-sm text-muted-foreground mb-8">
            Last updated: {lastUpdated}
          </p>
          <div className="space-y-8 text-sm sm:text-[15px] text-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
