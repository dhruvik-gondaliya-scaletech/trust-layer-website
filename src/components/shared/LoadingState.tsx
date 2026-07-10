import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  text?: string
  fullScreen?: boolean
}

export function LoadingState({ text = "Loading...", fullScreen = false }: LoadingStateProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90"
    : "flex w-full flex-col items-center justify-center p-8 text-muted-foreground"

  return (
    <div className={containerClasses}>
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      {text && <p className="text-sm font-medium animate-pulse">{text}</p>}
    </div>
  )
}
