import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface ActionSuccessViewProps {
  onNext: () => void
  buttonText?: string
}

export function ActionSuccessView({ onNext, buttonText = "Continue" }: ActionSuccessViewProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <div className="mb-8 relative">
        <div className="bg-success/10 p-6 rounded-full">
          <CheckCircle2 className="h-20 w-20 text-success" />
        </div>
      </div>
      
      <Button size="lg" className="w-full h-12 text-base mt-4" onClick={onNext}>
        {buttonText}
      </Button>
    </div>
  )
}
