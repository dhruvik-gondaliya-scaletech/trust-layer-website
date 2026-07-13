import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import type { ReactNode } from "react"

interface ActionSuccessViewProps {
  onNext: () => void
  buttonText?: string
  children?: ReactNode
}

export function ActionSuccessView({ onNext, buttonText = "Continue", children }: ActionSuccessViewProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-2 sm:py-4">
      <div className="mb-6 relative">
        <div className="bg-success/10 p-5 rounded-full">
          <CheckCircle2 className="h-16 w-16 text-success" />
        </div>
      </div>
      
      {children && (
        <div className="w-full mb-6 text-left">
          {children}
        </div>
      )}
      
      <Button size="lg" className="w-full h-12 text-base" onClick={onNext}>
        {buttonText}
      </Button>
    </div>
  )
}
