import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight } from "lucide-react"

interface TrustScoreViewProps {
  onComplete: () => void
}

export function TrustScoreView({ onComplete }: TrustScoreViewProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="relative flex items-center justify-center mb-4">
        {/* Core Shield */}
        <div className="bg-success/10 rounded-full p-6 text-success">
          <ShieldCheck className="h-16 w-16" />
        </div>
      </div>

      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          You're Verified!
        </h2>
        <p className="text-base text-muted-foreground">
          Your initial TrustScore has been generated. You are now ready to secure deals and make payments safely on TrustLayer.
        </p>
      </div>

      <div className="bg-muted/30 border rounded-xl p-6 w-full flex items-center justify-between">
        <span className="font-medium text-foreground">Initial TrustScore</span>
        <span className="text-3xl font-bold text-success">850</span>
      </div>

      <Button size="lg" className="w-full h-12 text-base mt-4" onClick={onComplete}>
        Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
