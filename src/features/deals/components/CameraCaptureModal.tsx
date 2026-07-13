import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Camera, CheckCircle2, ArrowLeft, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Shared TrustLayer camera guidance modal.
 *
 * Single source of truth for the capture experience across the product so any
 * future change updates every surface that uses it. Flow mirrors the approved
 * mobile-first design: Instruction Guidelines → live guidance capture → review.
 */

const GUIDANCE = [
  "Position item inside frame",
  "Get a bit closer",
  "Perfect. Ready to capture.",
] as const

const DEFAULT_CHECKLIST = [
  "Use natural lighting if possible",
  "Avoid shadows on the item",
  "Place on a clean, solid background",
]

type CameraStep = "instruction" | "capture" | "preview"

interface CameraCaptureModalProps {
  open: boolean
  onClose: () => void
  /** Called when the user accepts the captured photo. */
  onCapture: () => void
  title?: string
  heading?: string
  description?: string
  checklist?: string[]
}

export function CameraCaptureModal({
  open,
  onClose,
  onCapture,
  title = "Instruction Guidelines",
  heading = "Main Photo Guidelines",
  description = "This is the first photo buyers will see. Make sure it's clear, well-lit, and shows the entire item.",
  checklist = DEFAULT_CHECKLIST,
}: CameraCaptureModalProps) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState<CameraStep>("instruction")
  const [guide, setGuide] = useState(0)

  // Reset to the guidelines each time the modal opens.
  useEffect(() => {
    if (open) setStep("instruction")
  }, [open])

  // Simulated detection: cycle guidance while framing, then mark ready.
  useEffect(() => {
    if (step !== "capture") {
      setGuide(0)
      return
    }
    if (reduce) {
      setGuide(2)
      return
    }
    setGuide(0)
    const t1 = setTimeout(() => setGuide(1), 1000)
    const t2 = setTimeout(() => setGuide(2), 2200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [step, reduce])

  const ready = guide === 2
  const cornerColor = ready ? "#34d399" : "rgba(255,255,255,0.7)"

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            // Dismiss the instruction guidelines by clicking the backdrop.
            if (e.target === e.currentTarget && step === "instruction") onClose()
          }}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm",
            step === "instruction" ? "bg-black/65" : "bg-black/90",
          )}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "w-full bg-white shadow-2xl",
              step === "instruction"
                ? "max-w-[460px] rounded-[28px]"
                : "flex h-[700px] max-h-[90vh] max-w-[400px] flex-col overflow-hidden rounded-3xl",
            )}
          >
            {/* Instruction Guidelines */}
            {step === "instruction" && (
              <div className="p-8">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-primary">
                  {title}
                </p>

                <div className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Camera className="h-8 w-8" />
                </div>

                <h3 className="mt-5 text-center text-2xl font-bold tracking-tight text-slate-900">
                  {heading}
                </h3>
                <p className="mx-auto mt-2 max-w-[340px] text-center text-muted-foreground">
                  {description}
                </p>

                <div className="mt-6 space-y-3">
                  {checklist.map((tip) => (
                    <div key={tip} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">{tip}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  TrustLayer requires access to your camera.
                </p>

                <Button
                  className="mt-4 h-12 w-full rounded-xl bg-[#2F5EFF] text-base font-semibold hover:bg-[#2F5EFF]/90"
                  onClick={() => setStep("capture")}
                >
                  Continue to Camera
                </Button>
              </div>
            )}

            {/* Live capture with dynamic guidance */}
            {step === "capture" && (
              <div className="relative flex flex-1 flex-col bg-black">
                {/* Top bar */}
                <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between">
                  <button
                    className="rounded-full bg-black/50 p-2 text-white backdrop-blur"
                    onClick={onClose}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                </div>

                {/* Dynamic guidance bubble */}
                <div className="absolute inset-x-0 top-16 z-20 flex justify-center px-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={guide}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold backdrop-blur",
                        ready ? "bg-emerald-500/90 text-white" : "bg-white/15 text-white",
                      )}
                    >
                      {GUIDANCE[guide]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Frame with corner guides */}
                <div className="flex flex-1 items-center justify-center p-10">
                  <div className="relative aspect-square w-full max-w-[280px]">
                    <span
                      className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-[3px] border-t-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                    <span
                      className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-[3px] border-t-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                    <span
                      className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-[3px] border-l-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                    <span
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-[3px] border-r-[3px] transition-colors duration-300"
                      style={{ borderColor: cornerColor }}
                    />
                  </div>
                </div>

                {/* Shutter + helper text */}
                <div className="pb-8 pt-2">
                  <div className="flex justify-center">
                    <button
                      disabled={!ready}
                      onClick={() => setStep("preview")}
                      className={cn(
                        "relative h-16 w-16 rounded-full bg-white transition-all active:scale-95",
                        ready
                          ? "ring-4 ring-emerald-400/60"
                          : "cursor-not-allowed border-4 border-slate-300 opacity-50",
                      )}
                    />
                  </div>
                  <p className="mt-4 text-center text-xs text-white/70">
                    Ensure good lighting • Capture the entire product
                  </p>
                </div>
              </div>
            )}

            {/* Review */}
            {step === "preview" && (
              <div className="flex flex-1 flex-col bg-black">
                <div className="relative m-4 flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-900">
                  <ImageIcon className="h-24 w-24 text-slate-700" />
                </div>
                <div className="space-y-4 rounded-t-3xl bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-center text-lg font-semibold">Looks good?</h4>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="h-12 flex-1 rounded-xl"
                      onClick={() => setStep("capture")}
                    >
                      Retake
                    </Button>
                    <Button
                      className="h-12 flex-1 rounded-xl"
                      onClick={() => {
                        onCapture()
                        onClose()
                      }}
                    >
                      Use Photo
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
